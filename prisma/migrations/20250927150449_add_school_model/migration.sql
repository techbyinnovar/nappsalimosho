/*
  Warnings:

  - You are about to drop the column `address` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `proprietor` on the `School` table. All the data in the column will be lost.
  - Added the required column `email` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolio` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolAddress` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolName` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."School" DROP COLUMN "address",
DROP COLUMN "name",
DROP COLUMN "proprietor",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "portfolio" TEXT NOT NULL,
ADD COLUMN     "schoolAddress" TEXT NOT NULL,
ADD COLUMN     "schoolName" TEXT NOT NULL,
ADD COLUMN     "zone" TEXT NOT NULL;
