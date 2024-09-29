import { selector } from "recoil";
import { universitiesAndUserSelector } from "./uni-user-selector";
import { User } from "@/types";

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    try {
      const data = get(universitiesAndUserSelector);
      return data.userInfo as User;
    } catch (error) {
      throw error;
    }
  },
});
