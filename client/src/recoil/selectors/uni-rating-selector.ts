import { selector } from "recoil";
import axios from "axios";

export const ratingSelector = selector({
  key: "ratingSelector",
  get: async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      const response = await axios.get(`${backendUrl}/uni/get-rating`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      });
      return response.data.ratings;
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
