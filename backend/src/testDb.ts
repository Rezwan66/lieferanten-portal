import bcrypt from 'bcryptjs';
import { prisma } from './app/lib/prisma';
import { RoleEnum } from './generated/prisma/enums';

async function main() {
  const salt = 10;
  const hashedPass = await bcrypt.hash('admin-pass-tech-solutions', salt);
  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: 'shaikh@prisma.io',
      password: hashedPass,
      role: RoleEnum.ADMIN,
    },
  });
  console.log('Created user:', user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({});
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
