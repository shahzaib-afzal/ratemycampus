import { selector } from "recoil";
import axios from "axios";

export const universitiesAndUserSelector = selector({
  key: "universitiesAndUserSelector",
  get: async () => {
    try {
      const token = localStorage.getItem("Authorization");
      if (!token) throw new Error();
      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      const response = await axios.get(`${backendUrl}/uni/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw {
          status: error.response.status,
          message: error?.response?.data?.error || "Something went wrong!",
        };
      }
      throw {
        status: 403,
      };
    }
  },
});
