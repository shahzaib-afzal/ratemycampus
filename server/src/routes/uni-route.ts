import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { superUserAuth } from "../middlewares/superuser-auth";
import { uploadImage } from "../utils/cloudflare-r2";
import { uniSchema } from "../schema/zod";

export const uniRoute = new Hono<{
  Bindings: Bindings;
}>();

uniRoute.post("/add-university", superUserAuth, async (c) => {
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
    const errorMessages = parse.error.errors.map(
      (err) => `${err.path} is not valid!`
    );
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
