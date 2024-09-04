import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const userAuth = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization");
  try {
    if (!token || !token.startsWith("Bearer")) {
      throw new Error();
    }
    const payload = await verify(token.split(" ")[1], c.env.JWT_SECRET);
    if (!payload) throw new Error();
    c.set("userInfo", payload);
    await next();
  } catch (error) {
    return c.json({
      error: "Not Allowed!",
    });
  }
};
