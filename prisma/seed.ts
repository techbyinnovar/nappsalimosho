// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10) // default password

  // Upsert ensures it doesn’t create duplicates
  await prisma.user.upsert({
    where: { email: 'admin@napps.com' },
    update: {},
    create: {
      email: 'admin@napps.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Default admin user created: admin@napps.com / admin123')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
