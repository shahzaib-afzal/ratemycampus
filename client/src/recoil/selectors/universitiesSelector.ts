import { selector } from "recoil";
import { universitiesAndUserSelector } from "./uniUserSelector";

export const universitiesSelector = selector({
  key: "universitiesSelector",
  get: ({ get }) => {
    try {
      const data = get(universitiesAndUserSelector);
      return data.universities;
    } catch (error) {
      throw error;
    }
  },
});
