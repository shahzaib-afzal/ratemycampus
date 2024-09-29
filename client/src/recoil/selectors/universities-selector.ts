import { selector } from "recoil";
import { universitiesAndUserSelector } from "./uni-user-selector";
import { University } from "@/types";

export const universitiesSelector = selector({
  key: "universitiesSelector",
  get: ({ get }) => {
    try {
      const data = get(universitiesAndUserSelector);
      return data.universities as University[];
    } catch (error) {
      throw error;
    }
  },
});
