const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bursatalenta.com' },
    update: {},
    create: {
      email: 'admin@bursatalenta.com',
      password: 'admin123', // In production, this should be hashed
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
