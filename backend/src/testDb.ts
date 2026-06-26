import { prisma } from './app/lib/prisma';

async function main() {
  const role = await prisma.role.upsert({
    where: { name: 'Employee' },
    update: {},
    create: { name: 'Employee' },
  });
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      password: 'securepassword',
      role: {
        connect: { id: role.id },
      },
    },
  });
  console.log('Created user:', user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  console.log('All users:', JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
