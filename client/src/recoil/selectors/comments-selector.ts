import { Comment } from "@/types";
import axios from "axios";
import { selectorFamily } from "recoil";

export const postCommentsSelector = selectorFamily({
  key: "postCommentsSelector",
  get:
    ({ postId, fetch }: { postId: number; fetch: boolean }) =>
    async () => {
      if (!fetch) return null;

      const token = localStorage.getItem("Authorization");
      if (!token) throw new Error();

      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      try {
        const response = await axios.post(
          `${backendUrl}/uni/show-comments`,
          { postId: postId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response.data.comments as Comment[];
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw {
            status: error.response.status,
            message: error.response.data?.error || "Something went wrong!",
          };
        }
        throw {
          status: 401,
        };
      }
    },
});
