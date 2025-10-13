/*
  Warnings:

  - You are about to drop the column `email` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_schoolId_fkey";

-- AlterTable
ALTER TABLE "public"."School" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "name",
DROP COLUMN "schoolId",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- AddForeignKey
ALTER TABLE "public"."School" ADD CONSTRAINT "School_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
