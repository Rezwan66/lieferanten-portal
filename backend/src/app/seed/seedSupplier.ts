import { Supplier } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';

import suppliersData from './suppliers.json';

// console.log(suppliersData);

async function main() {
  console.log('Seeding Suppliers');
  console.log('_'.repeat(50));
  // Create suppliers
  const suppliers = await prisma.supplier.createMany({
    data: suppliersData as Supplier[],
  });
  console.log('Created suppliers:', suppliers);

  console.log('_'.repeat(50));
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
