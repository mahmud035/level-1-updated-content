import express from 'express';
import {
  createCoffee,
  deleteCoffee,
  getCoffee,
  getCoffees,
  updateCoffee,
} from '../controllers/coffees.controller.js';

const router = express.Router();

// Get all coffees
router.get('/', getCoffees);

// Get single coffee
router.get('/:id', getCoffee);

// Create new coffee
router.post('/', createCoffee);

// Update a coffee
router.put('/:id', updateCoffee);

// Delete a coffee
router.delete('/:id', deleteCoffee);

export default router;
