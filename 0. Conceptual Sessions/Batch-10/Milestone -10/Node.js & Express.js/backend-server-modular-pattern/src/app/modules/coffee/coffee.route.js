import express from 'express';
import { CoffeeController } from './coffee.controller.js';
import { CoffeeValidation } from './coffee.validation.js';

const router = express.Router();

// Get all coffees
router.get('/', CoffeeController.getCoffees);

// Get single coffee
router.get(
  '/:id',
  CoffeeValidation.getCoffeeValidation,
  CoffeeController.getCoffee
);

// Create new coffee
router.post('/', CoffeeController.createCoffee);

// Update a coffee
router.put(
  '/:id',
  CoffeeValidation.updateCoffeeValidation,
  CoffeeController.updateCoffee
);

// Delete a coffee
router.delete(
  '/:id',
  CoffeeValidation.deleteCoffeeValidation,
  CoffeeController.deleteCoffee
);

export const CoffeeRoutes = router;
