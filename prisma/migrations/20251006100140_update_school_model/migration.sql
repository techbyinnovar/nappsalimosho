/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `Admin` table. All the data in the column will be lost.
  - Made the column `name` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Admin" DROP COLUMN "emailVerified",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'ADMIN',
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "about" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "facilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "founded" INTEGER,
ADD COLUMN     "highlights" JSONB,
ADD COLUMN     "hours" JSONB,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "programs" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "staff" INTEGER,
ADD COLUMN     "students" INTEGER,
ADD COLUMN     "tuitionRange" TEXT,
ADD COLUMN     "website" TEXT;
