/*
  Warnings:

  - You are about to drop the column `name` on the `School` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Member" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."School" DROP COLUMN "name";
