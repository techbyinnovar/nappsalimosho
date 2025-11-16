-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "galleryUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "logoUrl" TEXT;
