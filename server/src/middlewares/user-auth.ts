import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const userAuth = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization");
  try {
    if (!token || !token.startsWith("Bearer")) {
      throw new Error();
    }
    const payload = (await verify(token.split(" ")[1], c.env.JWT_SECRET)) as {
      id: number;
      email: string;
      fullName: string;
      exp: number;
    };
    if (!payload) throw new Error();

    if (c.req.path === "/api/v1/user/post") {
      const formData = await c.req.formData();
      const userId = Number(formData.get("userid"));
      if (userId && userId !== payload.id) throw new Error();
    } else {
      const { userId } = await c.req.json();
      if (userId && userId !== payload.id) throw new Error();
    }

    c.set("userInfo", payload);
    await next();
  } catch (error) {
    return c.json(
      {
        error: "Not Allowed!",
      },
      401
    );
  }
};
