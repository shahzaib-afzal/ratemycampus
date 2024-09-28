import { University as Uni, User as UserInfo } from "ratemypackage";

export type University = Omit<Uni, "coverPhoto" | "logo"> & {
  id: number;
  coverPhoto: string;
  logo: string;
};
export type User = Omit<UserInfo, "password" | "profilePhoto"> & {
  id: number;
  isVerified: string;
  profilePhoto: string | null;
};
export interface Rating {
  universityId: number;
  averageRating: number;
  totalRatings: number;
}

export interface Post {
  id: number;
  content: string | null;
  photo: string | null;
  userId: number;
  authorName: string;
  authorProfile: string | null;
  comments: Comment[];
  totalComments: number;
}

export interface Comment {
  id: number;
  content: string;
  authorName: string;
}

export interface PostsState {
  posts: Post[];
  hasMore: boolean;
  isLoading: boolean;
}
