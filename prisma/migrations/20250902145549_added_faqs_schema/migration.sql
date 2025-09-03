-- CreateTable
CREATE TABLE "public"."CaseLawFaq" (
    "id" TEXT NOT NULL,
    "question" TEXT[],
    "answer" TEXT[],
    "noteId" TEXT NOT NULL,

    CONSTRAINT "CaseLawFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurrentAffairFaq" (
    "id" TEXT NOT NULL,
    "question" TEXT[],
    "answer" TEXT[],
    "noteId" TEXT NOT NULL,

    CONSTRAINT "CurrentAffairFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LawNoteFaq" (
    "id" TEXT NOT NULL,
    "question" TEXT[],
    "answer" TEXT[],
    "noteId" TEXT NOT NULL,

    CONSTRAINT "LawNoteFaq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseLawFaq_noteId_key" ON "public"."CaseLawFaq"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentAffairFaq_noteId_key" ON "public"."CurrentAffairFaq"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "LawNoteFaq_noteId_key" ON "public"."LawNoteFaq"("noteId");

-- AddForeignKey
ALTER TABLE "public"."CaseLawFaq" ADD CONSTRAINT "CaseLawFaq_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."CaseLaw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurrentAffairFaq" ADD CONSTRAINT "CurrentAffairFaq_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."CurrentAffair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LawNoteFaq" ADD CONSTRAINT "LawNoteFaq_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."LawNote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
