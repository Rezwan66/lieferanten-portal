import { Request, Response } from 'express';

import sendResponse from '../../utils/controllerUtils';
import { SupplierService } from './supplier.service';

const getAllSuppliers = async (req: Request, res: Response) => {
  const result = await SupplierService.getAllSuppliers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched suppliers successfully!',
    data: result,
  });
};

export const SupplierController = { getAllSuppliers };
