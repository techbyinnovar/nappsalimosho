/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "School_slug_key" ON "public"."School"("slug");
