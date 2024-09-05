import { Hono } from "hono";
import { uploadImage } from "../utils/cloudflare-r2";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { postSchema, userSchema } from "../schema/zod";
import { hashPassword, verifyPassword } from "../utils/encryption";
import { generateToken, generateVerificationToken } from "../utils/jwt-auth";
import { sendVerificationEmail } from "../utils/brevo";
import { verify } from "hono/jwt";
import { userAuth } from "../middlewares/user-auth";

export const userRoute = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const formData = await c.req.formData();
  const userInfo: User = {
    email: formData.get("email") as string,
    fullName: formData.get("fullname") as string,
    password: formData.get("password") as string,
    profilePhoto: formData.get("image") as File,
  };
  const parse = userSchema.safeParse(userInfo);

  if (!parse.success) {
    const errorMessages = parse.error.errors.map(
      (err) => `${err.path} is not valid!`
    );
    return c.json({ error: errorMessages }, 411);
  }

  try {
    const exist = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });
    if (exist)
      return c.json({ message: "User with this email already exist" }, 409);

    const token = await generateVerificationToken(userInfo.email, c.env);
    await sendVerificationEmail(userInfo.email, token, c.env);
    const hashedPassword = await hashPassword(userInfo.password);

    if (userInfo?.profilePhoto?.type.includes("image")) {
      const imageUrl = await uploadImage(
        userInfo.profilePhoto,
        c.env,
        `profile-img/${userInfo.email}`
      );
      await prisma.user.create({
        data: {
          email: userInfo.email,
          fullName: userInfo.fullName,
          password: hashedPassword,
          profilePhoto: imageUrl,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          email: userInfo.email,
          fullName: userInfo.fullName,
          password: hashedPassword,
        },
      });
    }
    return c.json({
      message: "Signed up successfully!",
    });
  } catch (error) {
    return c.json({ error: "Signup failed, please try again later" }, 500);
  }
});

userRoute.get("/verify-email", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const token = c.req.query("token");
  try {
    if (!token) {
      throw new Error();
    }
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) throw new Error();
    const email = payload.email as string;
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });
    return c.json({
      message: "Email is verified",
    });
  } catch (error) {
    return c.json(
      {
        error: "Verification Failed!",
      },
      400
    );
  }
});

userRoute.post("/login", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    const passMatched = await verifyPassword(password, user.password);
    if (!passMatched) throw new Error();
    const token = await generateToken(user.email, user.fullName, c.env);
    return c.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return c.json(
      {
        error: "Invalid email or password",
      },
      401
    );
  }
});

userRoute.post("/rating", userAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { rating, universityId, userId } = await c.req.json();

  try {
    const rate = await prisma.rating.create({
      data: {
        rating,
        universityId,
        userId,
      },
    });
    return c.json({
      message: "Rated Successfully!",
      rate,
    });
  } catch (error) {
    return c.json({
      error: "Cannot rate again!",
    });
  }
});

userRoute.post("/post", userAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const formData = await c.req.formData();

  const post: Post = {
    content: formData.get("content") as string,
    universityId: Number(formData.get("uniid") as string),
    userId: Number(formData.get("userid") as string),
    photo: formData.get("photo") as File,
  };

  const parse = postSchema.safeParse(post);
  if (!parse.success) {
    const errorMessages = parse.error.errors.map((err) => err.message);
    return c.json({ error: errorMessages }, 411);
  }
  try {
    let photoUrl = null;
    if (post?.photo?.type.includes("image")) {
      photoUrl = await uploadImage(
        post.photo,
        c.env,
        `posts/post${post.userId}`
      );
    }

    const userPost = await prisma.post.create({
      data: {
        content: post.content,
        universityId: post.universityId,
        userId: post.userId,
        photo: photoUrl,
      },
    });

    return c.json({
      message: "Posted Successfully!",
      userPost,
    });
  } catch (error) {
    return c.json({ error }, 400);
  }
});
