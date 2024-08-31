import { string, z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8, { message: "Password must be 8 character long" }),
  profilePhoto: z.any().optional(),
});
