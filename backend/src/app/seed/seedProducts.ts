import { prisma } from '../lib/prisma';

import productsData from './products.json';

console.log(productsData);

async function main() {
  console.log('Seeding Products');
  console.log('_'.repeat(50));
  // Fetch suppliers
  const suppliers = await prisma.supplier.findMany({ orderBy: { vatNumber: 'asc' } });
  //   console.log('Fetched suppliers:', suppliers);
  console.log('_'.repeat(50));

  // Create lookup table for SupplierId-Index
  const supplierLookup = suppliers.reduce(
    (table, supplier, index) => {
      table[index + 1] = supplier.id;
      return table;
    },
    {} as Record<number, string>,
  );

  // Transform Products to contain Supplier Id
  const productsWithSupplier = productsData.map(({ supplierIndex, ...product }) => ({
    ...product,
    supplierId: supplierLookup[supplierIndex],
  }));

  //   console.log(supplierLookup, productsWithSupplier);

  const productsCreated = await prisma.product.createMany({
    data: productsWithSupplier,
  });

  console.log(`Created ${productsCreated.count} products.`);
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
