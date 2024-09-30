import { selector } from "recoil";
import axios from "axios";
import { Rating } from "@/types";
import { triggerAtom } from "../atoms/trigger-atom";

export const ratingSelector = selector({
  key: "ratingSelector",
  get: async ({ get }) => {
    try {
      get(triggerAtom);
      const token = localStorage.getItem("Authorization");
      if (!token) throw new Error();

      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      const response = await axios.get(`${backendUrl}/uni/get-rating`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.ratings as Rating[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw {
          status: error.response.status,
          message: error?.response?.data?.error || "Something went wrong!",
        };
      }
      throw error;
    }
  },
});
