-- CreateTable
CREATE TABLE "public"."CaseLaws" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "CaseLaws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LawNotes" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "LawNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurrentAffairs" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "CurrentAffairs_pkey" PRIMARY KEY ("id")
);
