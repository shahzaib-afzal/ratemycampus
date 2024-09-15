import { useState } from "react";
import {
  Star,
  MapPin,
  Building,
  DollarSign,
  Image,
  Send,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../@/components/ui/avatar";
import { Button } from "../@/components/ui/button";
import { Textarea } from "../@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "../@/components/ui/card";
import { Separator } from "../@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../@/components/ui/tooltip";
import { Input } from "../@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const HalfStar = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
    <path d="M12 5.429V18.354L7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006c.224-.54.76-.824 1.212-.824z" />
  </svg>
);

export function UniversityPage() {
  const [userRating, setUserRating] = useState(0);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      content:
        "The computer science program here is top-notch! The professors are incredibly knowledgeable and always willing to help. I've learned so much in just one semester.",
      comments: [
        "Totally agree! The professors are amazing.",
        "I heard they just upgraded the CS lab too!",
      ],
    },
    {
      id: 2,
      author: "Jane Smith",
      content:
        "Just finished my first semester. The campus atmosphere is incredible! There's always something happening, whether it's club activities, guest lectures, or social events. It's easy to make friends and get involved.",
      comments: [],
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});

  const universityData = {
    name: "National University of Science and Technology (NUST)",
    location: "Islamabad, PK",
    campuses: 7,
    annualFee: 15000,
    totalRating: 4.2,
    totalReviews: 1287,
  };

  const handleRating = (value: number) => setUserRating(value);
  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          author: "Current User",
          content: newPost,
          comments: [],
        },
        ...posts,
      ]);
      setNewPost("");
    }
  };
  const handleCommentSubmit = (postId: number) => {
    if (newComments[postId]?.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComments[postId]] }
            : post,
        ),
      );
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    }
  };
  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };
  const submitRating = () => {
    alert(`Thank you for rating ${universityData.name} ${userRating} stars!`);
  };
  const deletePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-5 w-5 text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<HalfStar key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-600" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050520] font-sans text-white">
      <div className="relative h-72 overflow-hidden pb-10 sm:h-96 sm:pb-20">
        <img
          src="https://cdn.ratemycampus.live/uni-cover/cover1"
          alt="University Cover"
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
                src="https://cdn.ratemycampus.live/uni-logo/National%20University%20of%20Science%20and%20Technology%20(NUST)"
                alt="University Logo"
              />
              <AvatarFallback>
                {universityData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="pt-4 text-xl font-bold text-white sm:pt-0 sm:text-4xl">
                {universityData.name}
              </h1>
              <div className="mt-2 flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-300">
                  {universityData.location}
                </span>
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden items-center space-x-2 rounded-lg bg-white/10 p-3 shadow-lg backdrop-blur-sm sm:flex"
          >
            <div className="text-2xl font-bold text-white">
              {universityData.totalRating.toFixed(1)}
            </div>
            <div className="flex">
              {renderStars(universityData.totalRating)}
            </div>
            <div className="text-sm text-gray-300">
              ({universityData.totalReviews} reviews)
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
                          {universityData.campuses} Campuses
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
                          ${universityData.annualFee.toLocaleString()}/year
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
                className="mb-4 flex w-full items-center space-x-2 rounded-lg bg-white/10 p-3 shadow-lg backdrop-blur-sm sm:hidden"
              >
                <div className="text-2xl font-bold text-white">
                  {universityData.totalRating.toFixed(1)}
                </div>
                <div className="flex">
                  {renderStars(universityData.totalRating)}
                </div>
                <div className="text-sm text-gray-300">
                  ({universityData.totalReviews} reviews)
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
                          <HalfStar
                            className={`h-6 w-6 transition-colors duration-200 ${
                              star <= userRating
                                ? "text-yellow-400"
                                : "text-gray-600 hover:text-gray-400"
                            }`}
                          />
                        ) : (
                          <Star
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
                  onClick={submitRating}
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white transition-colors duration-200 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600"
                  disabled={userRating === 0}
                >
                  Submit Rating
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Share your thoughts about the university..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-4 resize-none rounded-lg border-none bg-white/10 p-3 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-white/20"
              rows={3}
            />
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-gray-600 bg-white/10 text-gray-300 transition-colors duration-200 hover:bg-white/20 hover:text-white"
              >
                <Image className="mr-2 h-4 w-4" /> Add Photo
              </Button>
              <Button
                onClick={handlePostSubmit}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white transition-colors duration-200 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600"
              >
                <Send className="mr-2 h-4 w-4" /> Post
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6 border-none bg-white/5 shadow-lg backdrop-blur-sm transition-shadow duration-200 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-200">
                          {post.author}
                        </p>
                      </div>
                    </div>
                    {post.author === "Current User" && (
                      <Button
                        variant="ghost"
                        onClick={() => deletePost(post.id)}
                        className="text-gray-400 transition-colors duration-200 hover:bg-red-900/20 hover:text-red-400"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                  <p className="mb-4 leading-relaxed text-gray-300">
                    {post.content}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {post.comments.length} Comments
                    {expandedComments[post.id] ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
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
                        {post.comments.map((comment, index) => (
                          <div
                            key={index}
                            className="mb-2 w-full rounded-lg bg-white/10 p-3"
                          >
                            <p className="text-sm text-gray-300">{comment}</p>
                          </div>
                        ))}
                        <div className="mt-2 flex w-full">
                          <Input
                            placeholder="Add a comment..."
                            value={newComments[post.id] || ""}
                            onChange={(e) =>
                              setNewComments((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            className="mr-2 flex-grow border-none bg-white/10 text-white placeholder-gray-400"
                          />
                          <Button
                            onClick={() => handleCommentSubmit(post.id)}
                            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white transition-colors duration-200 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600"
                          >
                            Post
                          </Button>
                        </div>
                      </CardFooter>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {posts.length >= 10 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-gray-600 bg-transparent text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
