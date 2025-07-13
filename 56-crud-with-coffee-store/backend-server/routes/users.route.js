import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  saveUserToDB,
  updateUser,
} from '../controllers/users.controller.js';

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get single user
router.get('/:id', getUser);

// Save user to database
router.post('/', saveUserToDB);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;
