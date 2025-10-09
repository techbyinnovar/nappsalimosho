-- CreateEnum
CREATE TYPE "public"."SchoolStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "status" "public"."SchoolStatus" NOT NULL DEFAULT 'PENDING';
