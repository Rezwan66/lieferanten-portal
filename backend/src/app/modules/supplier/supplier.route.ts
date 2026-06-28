import { Router } from 'express';
import { SupplierController } from './supplier.controller';

const router = Router();

router.get('/', SupplierController.getAllSuppliers);

export const SupplierRoutes = router;
