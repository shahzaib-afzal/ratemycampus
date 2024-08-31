import { Hono } from "hono";
import { uploadImage } from "../utils/cloudflare-r2";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userSchema } from "../schema/zod";
import { hashPassword } from "../utils/encryption";

export const userRoute = new Hono<{ Bindings: Bindings }>();

userRoute.get("/", async (c) => {
  return c.json({
    message: "Worker is up",
  });
});

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const formData = await c.req.formData();
  const userInfo: User = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    password: formData.get("password") as string,
    profilePhoto: formData.get("image") as File,
  };
  const parse = userSchema.safeParse(userInfo);

  if (!parse.success) {
    const errorMessages = parse.error.errors.map(
      (err) => `${err.path} is required`
    );
    return c.json({ error: errorMessages }, 411);
  }

  try {
    const exist = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });
    if (exist) return c.json({ message: "User with this email already exist" });
    const hashedPassword = await hashPassword(userInfo.password);
    const user = await prisma.user.create({
      data: {
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        password: hashedPassword,
      },
    });
    if (userInfo?.profilePhoto?.type.includes("image")) {
      const imageUrl = await uploadImage(
        userInfo.profilePhoto,
        c.env,
        user.id,
        "profile-img"
      );
      console.log(imageUrl);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          profilePhoto: imageUrl,
        },
      });
    }
    return c.json({
      message: "Signed up successfully!",
      user,
    });
  } catch (error) {
    return c.json({ error: "An error occured!" }, 500);
  }
});
