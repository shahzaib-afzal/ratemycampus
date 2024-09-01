import { sign } from "hono/jwt";

export const generateVerificationToken = async (
  email: string,
  env: Bindings
) => {
  const payload = { email };
  const token = await sign(payload, env.JWT_SECRET);
  return token;
};
