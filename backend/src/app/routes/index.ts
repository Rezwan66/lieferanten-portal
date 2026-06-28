import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/products/product.route';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/products', ProductRoutes);

export const IndexRoutes = router;
