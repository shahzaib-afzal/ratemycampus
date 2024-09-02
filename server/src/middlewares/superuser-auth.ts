import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const superUserAuth = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization");
  try {
    if (!token || !token.startsWith("Bearer")) {
      throw new Error();
    }
    const jwtSecret: string = c.env.JWT_SECRET;
    const payload = await verify(token.split(" ")[1], jwtSecret);
    if (!payload) throw new Error();
    const email = payload.email as string;
    if (!(email === c.env.SUPER_USER)) {
      throw new Error();
    }
    await next();
  } catch (error) {
    return c.json(
      {
        error: "Not Allowed!",
      },
      403
    );
  }
};
