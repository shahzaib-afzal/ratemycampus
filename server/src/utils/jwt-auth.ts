import { sign } from "hono/jwt";

export const generateVerificationToken = async (
  email: string,
  env: Bindings
) => {
  const payload = { email };
  const token = await sign(payload, env.JWT_SECRET);
  return token;
};

export const generateToken = async (
  email: string,
  firstName: string,
  lastName: string,
  env: Bindings
) => {
  const payload = {
    email,
    firstName,
    lastName,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // Expiration time in seconds (7 days)
  };
  const token = await sign(payload, env.JWT_SECRET);
  return token;
};
