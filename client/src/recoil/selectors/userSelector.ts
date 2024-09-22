import { selector } from "recoil";
import { universitiesAndUserSelector } from "./uniUserSelector";

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    try {
      const data = get(universitiesAndUserSelector);
      return data.userInfo;
    } catch (error) {
      throw error;
    }
  },
});
