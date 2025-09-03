/*
  Warnings:

  - You are about to drop the `CaseLaws` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurrentAffairs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LawNotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."CaseLaws";

-- DropTable
DROP TABLE "public"."CurrentAffairs";

-- DropTable
DROP TABLE "public"."LawNotes";

-- CreateTable
CREATE TABLE "public"."CaseLaw" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "thumbnailFieldId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "CaseLaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LawNote" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "thumbnailFieldId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "LawNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurrentAffair" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "thumbnailFieldId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "CurrentAffair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subscribed" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Subscribed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
