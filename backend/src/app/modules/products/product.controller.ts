import { Request, Response } from 'express';
import { ProductService } from './product.service';
import sendResponse from '../../utils/controllerUtils';

const getAllProducts = async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched products successfully!',
    data: result,
  });
};

export const ProductController = { getAllProducts };
