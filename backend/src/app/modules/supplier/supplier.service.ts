import { prisma } from '../../lib/prisma';

const getAllSuppliers = async () => {
  try {
    return await prisma.supplier.findMany({
      include: {
        products: true,
      },
      take: 10,
    });
  } catch (error) {
    console.error('Failed to fetch all suppliers:', error);
    throw new Error(error instanceof Error ? error.message : 'Suppliers fetching failed!');
  }
};

export const SupplierService = { getAllSuppliers };
