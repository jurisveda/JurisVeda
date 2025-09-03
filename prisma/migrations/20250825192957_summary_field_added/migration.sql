/*
  Warnings:

  - Added the required column `summary` to the `CaseLaws` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `CurrentAffairs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `LawNotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CaseLaws" ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."CurrentAffairs" ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."LawNotes" ADD COLUMN     "summary" TEXT NOT NULL;
