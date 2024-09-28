import React, { useEffect, useCallback, useRef } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useParams } from "react-router-dom";
import { universitiesSelector } from "@/recoil/selectors/universities-selector";
import { userSelector } from "@/recoil/selectors/user-selector";
import { ratingSelector } from "@/recoil/selectors/uni-rating-selector";
import {
  universityStateAtom,
  universityErrorAtom,
  universitiesAtom,
  userAtom,
  ratingsAtom,
  isSubmittingRatingAtom,
  userRatingAtom,
  postsAtom,
  newPostContentAtom,
  newPostImageAtom,
  expandedCommentsAtom,
  isPostingNewPostAtom,
} from "@/recoil/atoms/university-atoms";
import ErrorPage from "./ErrorPage";
import { UniversityPageSkeleton } from "@/@/components/university-page-skeleton";
import { Comment, Post, User } from "@/types";
import {
  Star,
  MapPin,
  Building,
  DollarSign,
  Image as ImageIcon,
  Send,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Trash2,
  X,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/@/components/ui/avatar";
import { Button } from "@/@/components/ui/button";
import { Textarea } from "@/@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/@/components/ui/card";
import { Separator } from "@/@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/@/components/ui/tooltip";
import { Input } from "@/@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { PostSkeleton, CommentSkeleton } from "@/@/components/ui/skeleton";
import { HalfStar } from "@/@/components/ui/HalfStar";
import axios from "axios";
import { postCommentsSelector } from "@/recoil/selectors/comments-selector";
import { useNotification } from "@/hooks/useNotification";

export default function UniversityPage() {
  const { uniname } = useParams();
  const [state, setState] = useRecoilState(universityStateAtom);
  const [error, setError] = useRecoilState(universityErrorAtom);
  const [universities, setUniversities] = useRecoilState(universitiesAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [ratings, setRatings] = useRecoilState(ratingsAtom);
  const [isSubmittingRating, setIsSubmittingRating] = useRecoilState(
    isSubmittingRatingAtom,
  );
  const [userRating, setUserRating] = useRecoilState(userRatingAtom);

  const uniData = useRecoilValueLoadable(universitiesSelector);
  const userData = useRecoilValueLoadable(userSelector);
  const ratingData = useRecoilValueLoadable(ratingSelector);

  const [newPostContent, setNewPostContent] =
    useRecoilState(newPostContentAtom);
  const [newPostImage, setNewPostImage] = useRecoilState(newPostImageAtom);
  const [expandedComments, setExpandedComments] =
    useRecoilState(expandedCommentsAtom);
  const [isPostingNewPost, setIsPostingNewPost] =
    useRecoilState(isPostingNewPostAtom);

  const { setShowNotification, setNotificationProps, notificationComponent } =
    useNotification();
  const pageRef = useRef(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const university = React.useMemo(() => {
    return universities.find((university) =>
      university.name.toLowerCase().includes(uniname?.toLowerCase() || ""),
    );
  }, [universities, uniname]);

  const [postsState, setPostsState] = useRecoilState(postsAtom(university?.id));

  useEffect(() => {
    if (
      uniData.state === "hasValue" &&
      userData.state === "hasValue" &&
      ratingData.state === "hasValue"
    ) {
      setUniversities(uniData.contents);
      setUser(userData.contents);
      setRatings(ratingData.contents);
      setState("hasValue");
    } else if (
      uniData.state === "hasError" ||
      userData.state === "hasError" ||
      ratingData.state === "hasError"
    ) {
      setState("hasError");
      setError(uniData.contents);
    }
  }, [uniData.state, userData.state, ratingData.state]);

  const fetchPosts = useCallback(async () => {
    if (!university) return;

    setPostsState((prev) => ({ ...prev, isLoading: true }));

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;

      const response = await axios.post(
        `${backendUrl}/uni/show-posts?page=${pageRef.current}`,
        { universityId: university.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        },
      );

      const newPosts = response.data.posts as Post[];
      setPostsState((prev) => ({
        posts: [...prev.posts, ...newPosts],
        hasMore: newPosts.length === 10,
        isLoading: false,
      }));
      if (newPosts.length === 10) pageRef.current += 1;
    } catch (error) {
      setPostsState((prev) => ({ ...prev, isLoading: false }));
      setNotificationProps({
        message: "Error fetching posts. Please try again later.",
        status: "error",
      });
      setShowNotification(true);
    }
  }, [university]);

  const loadMorePosts = useCallback(() => {
    if (!postsState.isLoading && postsState.hasMore) {
      fetchPosts();
    }
  }, [postsState.isLoading, postsState.hasMore, fetchPosts]);

  useEffect(() => {
    if (university) {
      pageRef.current = 1;
    }
    if (postsState.posts.length <= 0) {
      fetchPosts();
    }
  }, [university, fetchPosts]);

  const handleRating = useCallback(
    (value: number) => setUserRating(value),
    [setUserRating],
  );

  const handleSubmitRating = useCallback(async () => {
    if (userRating > 0 && !isSubmittingRating) {
      setIsSubmittingRating(true);
      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      try {
        const response = await axios.post(
          `${backendUrl}/user/rate`,
          {
            rating: userRating,
            userId: user?.id,
            universityId: university?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            },
          },
        );
        setNotificationProps({
          message: `You have rated ${uniname?.toUpperCase()} ${response.data.rate} stars`,
          status: "success",
        });
      } catch (error) {
        setNotificationProps({
          message:
            (axios.isAxiosError(error) && error.response?.data?.error) ||
            "You cannot rate this time. Please try again.",
          status: "error",
        });
        setShowNotification(true);
      } finally {
        setIsSubmittingRating(false);
        setUserRating(0);
        setShowNotification(true);
      }
    }
  }, [userRating, isSubmittingRating, setIsSubmittingRating, setUserRating]);

  const handlePostSubmit = useCallback(async () => {
    if (newPostContent.trim() || newPostImage) {
      setIsPostingNewPost(true);

      const formData = new FormData();
      formData.append("content", newPostContent);
      if (newPostImage) {
        formData.append("photo", newPostImage);
      }
      if (university && user) {
        formData.append("uniid", university.id.toString());
        formData.append("userid", user.id.toString());
      }
      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      try {
        const response = await axios.post(`${backendUrl}/user/post`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        });

        const newPost: Post = {
          ...response.data.post,
          comments: [],
          totalComments: 0,
        };

        setPostsState((prevState) => ({
          ...prevState,
          posts: [newPost, ...prevState.posts],
        }));
        setNewPostContent("");
        setNewPostImage(null);
      } catch (error) {
        setNotificationProps({
          message: "Failed to post. Please try again later.",
          status: "error",
        });
        setShowNotification(true);
      }
    }
  }, [
    newPostContent,
    newPostImage,
    university,
    user,
    setPostsState,
    setNewPostContent,
    setNewPostImage,
    setIsPostingNewPost,
  ]);

  const handleCommentSubmit = useCallback(
    async (postId: number, comment: string, userId: number) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      try {
        const response = await axios.post(
          `${backendUrl}/user/comment`,
          { postId, comment, userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            },
          },
        );

        setPostsState((prevState) => ({
          ...prevState,
          posts: prevState.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    response.data.postedComment as Comment,
                    ...post.comments.slice(0, 2),
                  ],
                  totalComments: post.totalComments + 1,
                }
              : post,
          ),
        }));
      } catch (error) {
        setNotificationProps({
          message: "Failed to Comment. Please try again later.",
          status: "error",
        });
        setShowNotification(true);
      }
    },
    [setPostsState],
  );

  const toggleComments = useCallback(
    (postId: number) => {
      setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    },
    [setExpandedComments],
  );

  const deletePost = useCallback(
    async (postId: number, userId: number) => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
        await axios.delete(`${backendUrl}/user/delete-post`, {
          data: { postId, userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        });
      } catch (error) {
        setNotificationProps({
          message: "Failed to delete the post. Please try again.",
          status: "error",
        });
        setShowNotification(true);
      } finally {
        setPostsState((prevState) => ({
          ...prevState,
          posts: prevState.posts.filter((post) => post.id !== postId),
        }));
      }
    },
    [setPostsState],
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setNewPostImage(file);
      }
      // Prevent reupload of same file
      event.target.value = "";
    },
    [setNewPostImage],
  );

  const handleRemoveImage = useCallback(() => {
    setNewPostImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [setNewPostImage]);

  const renderStars = useCallback((rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<HalfStar key={i} className="h-5 w-5 text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-600" />);
      }
    }
    return stars;
  }, []);

  if (state === "loading") {
    return <UniversityPageSkeleton />;
  }

  if (state === "hasError") {
    if (error?.status === 401 || error?.status === 403) {
      return (
        <ErrorPage
          takeMeTo="/login"
          takeMeButton="to Login page"
          message="Access Denied!"
          description="You're not authorized to access this page. Please log in to continue."
        />
      );
    } else {
      return <ErrorPage />;
    }
  }

  if (!university) {
    return (
      <ErrorPage
        takeMeTo="/dashboard"
        takeMeButton="to Dashboard"
        message="University not found"
        description="The university you are looking for does not exist."
      />
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#050520] to-[#2a1b3d] font-sans text-white">
      <div className="relative h-72 overflow-hidden pb-10 sm:h-96 sm:pb-20">
        <img
          src={university.coverPhoto}
          alt={university.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050520] via-[#050520]/70 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 right-0 top-36 flex flex-col items-start justify-between p-1 sm:bottom-0 sm:top-auto sm:flex-row sm:items-end sm:p-10"
        >
          <div className="mb-4 flex items-center sm:mb-0">
            <Avatar className="h-28 w-28 shadow-lg sm:h-32 sm:w-32">
              <AvatarImage
                src={university.logo}
                alt={`${university.name}'s Logo`}
              />
              <AvatarFallback>
                {university.name
                  .split("(")[1]
                  .split("")
                  .filter((n: string) => n !== ")")
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 sm:max-w-5xl">
              <h1 className="pt-4 text-xl font-bold text-white sm:pt-0 sm:text-4xl">
                {university.name}
              </h1>
              <div className="mt-2 flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-300">
                  {`${university.mainCampus}, PK`}
                </span>
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden items-center space-x-2 rounded-lg bg-white/10 p-3 shadow-lg backdrop-blur-sm sm:flex"
          >
            <div className="text-2xl font-bold text-white">
              {
                ratings.find((rating) => rating.universityId === university.id)
                  ?.averageRating
              }
            </div>
            <div className="flex">
              {renderStars(
                ratings.find((rating) => rating.universityId === university.id)
                  ?.averageRating || 0,
              )}
            </div>
            <div className="text-sm text-gray-300">
              (
              {
                ratings.find((rating) => rating.universityId === university.id)
                  ?.totalRatings
              }{" "}
              reviews)
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-none bg-white/5 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between">
              <div className="mb-4 flex items-center space-x-6 sm:mb-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center rounded-lg bg-white/10 p-3 shadow-sm"
                      >
                        <Building className="mr-2 h-5 w-5 text-gray-300" />
                        <span className="cursor-pointer text-gray-200">
                          {university.campuses} Campuses
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of campuses</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center rounded-lg bg-white/10 p-3 shadow-sm"
                      >
                        <DollarSign className="mr-2 h-5 w-5 text-gray-300" />
                        <span className="cursor-pointer text-gray-200">
                          PKR {university.fee.toLocaleString()}
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tuition fee of top field per semester</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-4 flex w-full items-center space-x-3 rounded-lg bg-white/10 p-3 shadow-lg backdrop-blur-sm sm:hidden"
              >
                <div className="text-2xl font-bold text-white">
                  {
                    ratings.find(
                      (rating) => rating.universityId === university.id,
                    )?.averageRating
                  }
                </div>
                <div className="flex">
                  {renderStars(
                    ratings.find(
                      (rating) => rating.universityId === university.id,
                    )?.averageRating || 0,
                  )}
                </div>
                <div className="text-sm text-gray-300">
                  (
                  {
                    ratings.find(
                      (rating) => rating.universityId === university.id,
                    )?.totalRatings
                  }{" "}
                  reviews)
                </div>
              </motion.div>

              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-300">
                    Your Rating:
                  </span>
                  <div className="ml-4 flex">
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className="h-6 w-6 focus:outline-none"
                      >
                        {star % 1 !== 0 ? (
                          <Star
                            className={`h-6 w-6 transition-colors duration-200 ${
                              star <= userRating
                                ? "text-yellow-400"
                                : "text-gray-600 hover:text-gray-400"
                            }`}
                          />
                        ) : (
                          <HalfStar
                            className={`h-6 w-6 transition-colors duration-200 ${
                              star <= userRating
                                ? "text-yellow-400"
                                : "text-gray-600 hover:text-gray-400"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleSubmitRating}
                  className="rounded-md border border-[#4A4A66] bg-gradient-to-r from-[#1C1C30] to-[#2A2A40] text-white transition-colors duration-200 hover:border-[#66668A] hover:from-[#33334D] hover:to-[#4A4A66]"
                  disabled={userRating === 0 || isSubmittingRating}
                >
                  {isSubmittingRating ? "Submitting..." : "Submit Rating"}
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Share your thoughts about the university..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value.slice(0, 300))}
              className="mb-4 resize-none rounded-lg border-none bg-white/10 p-3 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-white/20"
              rows={3}
            />
            {newPostContent.length >= 300 && (
              <p className="mb-4 flex items-center text-xs text-yellow-500">
                <AlertCircle className="mr-1 h-3 w-3" />
                Post limit reached (300 characters)
              </p>
            )}
            {newPostImage && (
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={URL.createObjectURL(newPostImage)}
                  alt="New post"
                  className="max-h-[500px] w-full object-contain"
                />
                <Button
                  variant="ghost"
                  className="absolute right-2 top-2 text-white hover:bg-red-500/20"
                  onClick={handleRemoveImage}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button
                  variant="outline"
                  className="border-gray-600 bg-white/10 text-gray-300 transition-colors duration-200 hover:bg-white/20 hover:text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="mr-2 h-4 w-4" /> Add Photo
                </Button>
              </div>
              <Button
                onClick={handlePostSubmit}
                className="rounded-md border border-[#4A4A66] bg-gradient-to-r from-[#1C1C30] to-[#2A2A40] text-white transition-colors duration-200 hover:border-[#66668A] hover:from-[#33334D] hover:to-[#4A4A66]"
                disabled={
                  (!newPostContent.trim() && !newPostImage) || isPostingNewPost
                }
              >
                <Send className="mr-2 h-4 w-4" />{" "}
                {isPostingNewPost ? "Posting..." : "Post"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isPostingNewPost && <PostSkeleton />}

        {postsState.isLoading && postsState.posts.length === 0 ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          <AnimatePresence>
            {postsState.posts.map((post) => (
              <PostComponent
                key={post.id}
                post={post}
                user={user!}
                onDelete={deletePost}
                onComment={handleCommentSubmit}
                onToggleComments={toggleComments}
                expandedComments={expandedComments}
              />
            ))}
          </AnimatePresence>
        )}

        {postsState.hasMore && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-gray-600 bg-transparent text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              onClick={loadMorePosts}
              disabled={postsState.isLoading}
            >
              {postsState.isLoading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}

        {postsState.isLoading && postsState.posts.length > 0 && (
          <div className="mt-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        {!postsState.isLoading &&
          !postsState.hasMore &&
          postsState.posts.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-gray-300">
                You've reached the end! You've viewed all the posts for this
                university.
              </p>
            </div>
          )}
      </div>
      {notificationComponent}
    </div>
  );
}

const PostComponent: React.FC<{
  post: Post;
  user: User;
  onDelete: (id: number, userId: number) => Promise<void>;
  onComment: (postId: number, comment: string, userId: number) => Promise<void>;
  onToggleComments: (postId: number) => void;
  expandedComments: { [key: number]: boolean };
}> = React.memo(
  ({ post, user, onDelete, onComment, onToggleComments, expandedComments }) => {
    const [newComment, setNewComment] = React.useState("");
    const [isPostingComment, setIsPostingComment] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [fetchComments, setfetchComments] = React.useState(false);

    const commentsLoadable = useRecoilValueLoadable(
      postCommentsSelector({ postId: post.id, fetch: fetchComments }),
    );

    const handleCommentSubmit = React.useCallback(async () => {
      if (newComment.trim()) {
        setIsPostingComment(true);
        await onComment(post.id, newComment, user.id);
        setNewComment("");
        setIsPostingComment(false);
      }
    }, [post.id, newComment, onComment]);

    const handleDelete = React.useCallback(async () => {
      setIsDeleting(true);
      await onDelete(post.id, user.id);
    }, [post.id, onDelete]);

    const renderComments = () => {
      if (!fetchComments) {
        return post.comments.map((comment: Comment) => (
          <div
            key={comment.id}
            className="mb-2 w-full rounded-lg bg-white/10 p-3"
          >
            <p className="text-sm font-semibold text-gray-200">
              {comment.authorName}
            </p>
            <p className="whitespace-pre-wrap break-words text-sm text-gray-300">
              {comment.content}
            </p>
          </div>
        ));
      }
      switch (commentsLoadable.state) {
        case "hasValue":
          return commentsLoadable.contents?.map((comment: Comment) => (
            <div
              key={comment.id}
              className="mb-2 w-full rounded-lg bg-white/10 p-3"
            >
              <p className="text-sm font-semibold text-gray-200">
                {comment.authorName}
              </p>
              <p className="whitespace-pre-wrap break-words text-sm text-gray-300">
                {comment.content}
              </p>
            </div>
          ));
        case "loading":
          return (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          );
        case "hasError":
          return (
            <p className="text-red-500">
              Error loading comments. Please try again.
            </p>
          );
        default:
          return null;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6 overflow-hidden border-none bg-white/5 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.div
              animate={isDeleting ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={post?.authorProfile ?? undefined}
                      alt={post.authorName}
                    />
                    <AvatarFallback className="text-base font-bold">
                      {post.authorName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-200">
                      {post.authorName}
                    </p>
                  </div>
                </div>
                {post.userId === user.id && (
                  <Button
                    variant="ghost"
                    onClick={handleDelete}
                    className="text-gray-400 transition-colors duration-200 hover:bg-red-600/20 hover:text-red-600"
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              {post.content && (
                <p className="mb-4 whitespace-pre-wrap break-words leading-relaxed text-gray-300">
                  {post.content}
                </p>
              )}
              {post.photo && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={post.photo}
                    alt="Post"
                    className="max-h-[500px] w-full object-contain"
                  />
                </div>
              )}
              <Button
                className="rounded-md border border-[#161346] bg-gradient-to-r from-[#292741] to-[#28263c] text-gray-400 transition-all duration-200 hover:border-[#8a84ff] hover:from-[#5a5780] hover:to-[#333248] hover:shadow-lg hover:shadow-[#6c63ff]/20"
                onClick={() => onToggleComments(post.id)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {post.totalComments} Comments
                {expandedComments[post.id] ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </CardContent>
          <AnimatePresence>
            {expandedComments[post.id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Separator className="bg-gray-700" />
                <CardFooter className="flex flex-col items-start p-4">
                  {renderComments()}
                  {post.totalComments > 3 && !fetchComments && (
                    <Button
                      className="mt-2 rounded-md px-3 py-1 text-[#a5a3ff] transition-colors duration-200 hover:bg-[#3f3d56]/30 hover:text-[#d4d2ff]"
                      onClick={() => {
                        setfetchComments(true);
                      }}
                    >
                      See other comments
                    </Button>
                  )}
                  <div className="mt-2 flex w-full items-center">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) =>
                        setNewComment(e.target.value.slice(0, 150))
                      }
                      className="mr-2 flex-grow border-none bg-white/10 py-6 text-white placeholder-gray-400"
                    />
                    <Button
                      onClick={handleCommentSubmit}
                      className="rounded-md border border-[#4A4A66] bg-gradient-to-r from-[#1C1C30] to-[#2A2A40] text-white transition-colors duration-200 hover:border-[#66668A] hover:from-[#33334D] hover:to-[#4A4A66]"
                      disabled={isPostingComment || newComment.length === 0}
                    >
                      {isPostingComment ? "Posting..." : "Post"}
                    </Button>
                  </div>
                  {newComment.length >= 150 && (
                    <p className="mt-2 flex items-center text-xs text-yellow-500">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Comment limit reached (150 characters)
                    </p>
                  )}
                  {isPostingComment && <CommentSkeleton />}
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    );
  },
);
