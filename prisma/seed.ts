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



// // prisma/seed.ts
// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcrypt'

// const prisma = new PrismaClient()

// async function main() {
//   const hashedPassword = await bcrypt.hash('admin123', 10) // default password

//   // Upsert ensures it doesn’t create duplicates
//   await prisma.admin.upsert({
//     where: { email: 'admin@napps.com' },
//     update: {},
//     create: {
//       email: 'admin@napps.com',
//       name: 'Super Admin',
//       password: hashedPassword,
//       role: 'ADMIN',
//     },
//   })

//   console.log('✅ Default admin user created: admin@napps.com / admin123')
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch((e) => {
//     console.error(e)
//     prisma.$disconnect()
//     process.exit(1)
//   })
