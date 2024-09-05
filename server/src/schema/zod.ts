import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z.string(),
  password: z.string().min(8, { message: "Password must be 8 character long" }),
  profilePhoto: z.any().optional(),
});

export const uniSchema = z.object({
  name: z.string(),
  fee: z.string(),
  topField: z.string(),
  status: z.string(),
  mainCampus: z.string(),
  campuses: z.string(),
  logo: z.any(),
  coverPhoto: z.any(),
});

export const postSchema = z.object({
  content: z.string().max(500, "Post cannot exceed 500 characters"),
});
