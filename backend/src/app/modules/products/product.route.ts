import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.get('/', ProductController.getAllProducts);

export const ProductRoutes = router;
