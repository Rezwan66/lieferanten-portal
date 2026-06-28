import { prisma } from '../../lib/prisma';

const getAllProducts = async () => {
  try {
    return await prisma.product.findMany({
      include: {
        supplier: true,
        purchaseRequests: true,
      },
    });
  } catch (error) {
    console.error('Failed to fetch all products:', error);
    throw new Error(error instanceof Error ? error.message : 'Products fetching failed!!');
  }
};

export const ProductService = { getAllProducts };
