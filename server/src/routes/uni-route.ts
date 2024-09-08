import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { superUserAuth } from "../middlewares/superuser-auth";
import { uploadImage } from "../utils/cloudflare-r2";
import { uniSchema } from "../schema/zod";
import { userAuth } from "../middlewares/user-auth";

export const uniRoute = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

uniRoute.post("/add", superUserAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const formData = await c.req.formData();
  const universityInfo: University = {
    name: formData.get("name") as string,
    fee: formData.get("fee") as string,
    topField: formData.get("topfield") as string,
    status: formData.get("status") as string,
    campuses: formData.get("campuses") as string,
    mainCampus: formData.get("maincampus") as string,
    logo: formData.get("logo") as File,
    coverPhoto: formData.get("cover") as File,
  };

  const parse = uniSchema.safeParse(universityInfo);
  if (!parse.success) {
    const errorMessages = parse.error.errors.map((err) => err.message);
    return c.json({ error: errorMessages }, 411);
  }

  try {
    const logoUrl = await uploadImage(
      universityInfo.logo,
      c.env,
      `uni-logo/${universityInfo.name}`
    );
    const coverUrl = await uploadImage(
      universityInfo.coverPhoto,
      c.env,
      `uni-cover/cover${
        universityInfo.coverPhoto.name.split("-")[1].split(".")[0]
      }`
    );
    const uni = await prisma.university.create({
      data: {
        name: universityInfo.name,
        fee: new Intl.NumberFormat("en-PK").format(Number(universityInfo.fee)),
        topField: universityInfo.topField,
        status: universityInfo.status,
        campuses: universityInfo.campuses,
        mainCampus: universityInfo.mainCampus,
        logo: logoUrl,
        coverPhoto: coverUrl,
      },
    });
    return c.json({
      message: `${uni.name} is added successfully!`,
    });
  } catch (error) {
    return c.json(
      {
        error: "Failed to update data",
      },
      500
    );
  }
});

uniRoute.get("/list", userAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = c.get("userInfo");
  try {
    const universities = await prisma.university.findMany({
      cacheStrategy: {
        ttl: 86400,
        swr: 300,
      },
    });
    const userInfo = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        fullName: true,
        isVerified: true,
        email: true,
        profilePhoto: true,
      },
    });
    return c.json({
      userInfo,
      universities,
    });
  } catch (error) {
    return c.json({
      error: "An unexpected error occured!",
    });
  }
});

uniRoute.get("/get-rating", userAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { universityId } = await c.req.json();
  try {
    const rating = await prisma.rating.findMany({
      cacheStrategy: {
        ttl: 43200,
        swr: 300,
      },
      where: {
        universityId,
      },
      select: {
        rating: true,
      },
    });
    if (rating.length === 0) {
      return c.json({
        averageRating: 0,
      });
    }
    const averageRating =
      rating.reduce((sum, val) => sum + val.rating, 0) / rating.length;
    return c.json({
      averageRating,
    });
  } catch (error) {
    return c.json(
      {
        error: "An unexpected error occurred while fetching the rating.",
      },
      500
    );
  }
});

uniRoute.get("/show-posts", userAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { universityId } = await c.req.json();
  const page = Number(c.req.query("page"));
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    const posts = await prisma.post.findMany({
      take: pageSize,
      skip: skip,
      select: {
        id: true,
        content: true,
        photo: true,
        userId: true,
        User: {
          select: {
            fullName: true,
          },
        },
      },
      where: {
        universityId,
      },
      orderBy: {
        id: "desc",
      },
      cacheStrategy: {
        ttl: 60,
        swr: 5,
      },
    });
    return c.json({
      posts,
    });
  } catch (error) {
    return c.json(
      {
        error: "Failed to fetch posts for the given university",
      },
      500
    );
  }
});

uniRoute.get("/show-comments", userAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { postId } = await c.req.json();
  const page = Number(c.req.query("page"));
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    const comments = await prisma.comment.findMany({
      take: pageSize,
      skip: skip,
      select: {
        id: true,
        comment: true,
        userId: true,
        User: {
          select: {
            fullName: true,
          },
        },
      },
      where: {
        postId: postId,
      },
      orderBy: {
        id: "desc",
      },
      cacheStrategy: {
        ttl: 30,
        swr: 5,
      },
    });
    return c.json({
      comments,
    });
  } catch (error) {
    return c.json(
      {
        error: "Failed to fetch comments!",
      },
      503
    );
  }
});
