import express from 'express';
import { ProductController } from './product.controller.js';
import { ProductValidation } from './product.validation.js';

const router = express.Router();

// Get all products
router.get('/', ProductController.getProducts);

// Search products
router.get('/search', ProductController.searchProducts);

// Get single product
router.get(
  '/:id',
  ProductValidation.getProductValidation,
  ProductController.getProduct
);

// Create new product
router.post(
  '/',
  ProductValidation.createProductValidation,
  ProductController.createProduct
);

// Update a product
router.put(
  '/:id',
  ProductValidation.updateProductValidation,
  ProductController.updateProduct
);

// Delete a product
router.delete(
  '/:id',
  ProductValidation.deleteProductValidation,
  ProductController.deleteProduct
);

export const ProductRoutes = router;
