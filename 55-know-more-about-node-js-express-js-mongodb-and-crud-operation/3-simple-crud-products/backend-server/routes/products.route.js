import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/products.controller.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Get single product
router.get('/:id', getProduct);

// Create new product
router.post('/', createProduct);

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

export default router;
