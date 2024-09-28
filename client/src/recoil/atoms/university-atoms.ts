import { PostsState, Rating, University, User } from "@/types";
import { atom, atomFamily } from "recoil";

export const postsAtom = atomFamily<PostsState, number | undefined>({
  key: "postsAtom",
  default: {
    posts: [],
    hasMore: true,
    isLoading: false,
  },
});

export const newPostContentAtom = atom<string>({
  key: "newPostContentAtom",
  default: "",
});

export const newPostImageAtom = atom<File | null>({
  key: "newPostImageAtom",
  default: null,
});

export const universityStateAtom = atom<"loading" | "hasError" | "hasValue">({
  key: "universityStateAtom",
  default: "loading",
});

export const universityErrorAtom = atom<{
  status: number;
  message: string;
} | null>({
  key: "universityErrorAtom",
  default: null,
});

export const universitiesAtom = atom<University[]>({
  key: "universitiesAtom",
  default: [],
});

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});

export const ratingsAtom = atom<Rating[]>({
  key: "ratingsAtom",
  default: [],
});

export const isSubmittingRatingAtom = atom<boolean>({
  key: "isSubmittingRatingAtom",
  default: false,
});

export const userRatingAtom = atom<number>({
  key: "userRatingAtom",
  default: 0,
});

export const expandedCommentsAtom = atom<{ [key: number]: boolean }>({
  key: "expandedCommentsAtom",
  default: {},
});

export const isPostingNewPostAtom = atom<boolean>({
  key: "isPostingNewPostAtom",
  default: false,
});
