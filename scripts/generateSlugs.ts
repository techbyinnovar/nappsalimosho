// scripts/generateSlugs.ts
import { prisma } from "../src/server/prisma";
import slugify from "slugify";

async function main() {
  const schools = await prisma.school.findMany({
    where: { slug: null },
  });

  for (const school of schools) {
    const slug = slugify(school.schoolName, { lower: true, strict: true });
    await prisma.school.update({
      where: { id: school.id },
      data: { slug },
    });
  }

  console.log("✅ Slugs generated for all existing schools");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
