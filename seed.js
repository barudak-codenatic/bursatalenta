const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create sample users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bursatalenta.com' },
    update: {},
    create: {
      email: 'admin@bursatalenta.com',
      password: hashedPassword, // Password is now hashed
      name: 'Admin User',
      role: 'ADMIN'
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
