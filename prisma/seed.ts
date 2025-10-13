// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@napps.com";
  const plainPassword = "admin123";

  // Hash password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Upsert Admin user
  await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashedPassword, // update in case it changed
      name: "Super Admin",
      role: "ADMIN",
    },
    create: {
      email,
      name: "Super Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ Default admin created: ${email} / ${plainPassword}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });


