import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/products/product.route';
import { SupplierRoutes } from '../modules/supplier/supplier.route';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/products', ProductRoutes);
router.use('/supplier', SupplierRoutes);

export const IndexRoutes = router;
