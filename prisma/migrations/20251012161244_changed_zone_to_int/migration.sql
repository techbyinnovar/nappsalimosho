/*
  Warnings:

  - The `zone` column on the `School` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."School" DROP COLUMN "zone",
ADD COLUMN     "zone" INTEGER;
