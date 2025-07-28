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

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: 'user123', // In production, this should be hashed
      name: 'John Doe',
      role: 'USER'
    }
  });

  // Create sample jobs
  const jobs = [
    {
      company_name: 'PT Teknologi Maju',
      title: 'UI/UX Designer Junior',
      description: 'Mencari UI/UX Designer junior yang kreatif dan berpengalaman minimal 1 tahun. Bertanggung jawab untuk mendesain interface yang user-friendly.',
      location: 'Jakarta Selatan',
      salary: 12000000,
      type: 'Full Time',
      image: '/assets/logo.png',
      is_approved: true,
      is_opened: true,
      approved_by: admin.id
    },
    {
      company_name: 'PT Digital Inovasi',
      title: 'Frontend Developer',
      description: 'Bergabunglah dengan tim frontend kami untuk mengembangkan aplikasi web modern menggunakan React.js dan teknologi terkini.',
      location: 'Jakarta Pusat',
      salary: 15000000,
      type: 'Full Time',
      image: '/assets/logo.png',
      is_approved: true,
      is_opened: true,
      approved_by: admin.id
    },
    {
      company_name: 'PT Solusi Digital',
      title: 'Backend Developer Senior',
      description: 'Posisi backend developer senior untuk mengembangkan API dan sistem backend yang scalable menggunakan Node.js dan database.',
      location: 'Bandung',
      salary: 20000000,
      type: 'Full Time',
      image: '/assets/logo.png',
      is_approved: true,
      is_opened: false,
      approved_by: admin.id
    },
    {
      company_name: 'PT Mobile Apps',
      title: 'Mobile Developer',
      description: 'Mengembangkan aplikasi mobile untuk iOS dan Android menggunakan React Native atau Flutter.',
      location: 'Surabaya',
      salary: 14000000,
      type: 'Contract',
      image: '/assets/logo.png',
      is_approved: false,
      is_opened: true
    },
    {
      company_name: 'PT Data Analytics',
      title: 'Data Scientist',
      description: 'Analisis data besar dan machine learning untuk memberikan insights bisnis yang valuable.',
      location: 'Jakarta Barat',
      salary: 25000000,
      type: 'Part Time',
      image: '/assets/logo.png',
      is_approved: true,
      is_opened: true,
      approved_by: admin.id
    },
    {
      company_name: 'PT UX Research',
      title: 'Senior UX Researcher',
      description: 'Melakukan riset pengguna dan usability testing untuk meningkatkan pengalaman pengguna produk digital.',
      location: 'Remote',
      salary: 30000000,
      type: 'Freelance',
      image: '/assets/logo.png',
      is_approved: true,
      is_opened: true,
      approved_by: admin.id
    }
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: job
    });
  }

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
