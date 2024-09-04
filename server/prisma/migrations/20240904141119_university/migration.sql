-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "topField" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "campuses" TEXT NOT NULL,
    "mainCampus" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "coverPhoto" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);
