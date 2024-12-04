import express from 'express';
import { UserController } from './user.controller.js';
import { UserValidation } from './user.validation.js';

const router = express.Router();

// Get all users
router.get('/', UserController.getUsers);

// Search users
router.get('/search', UserController.searchUsers);

// Get single user
router.get('/:id', UserValidation.getUserValidation, UserController.getUser);

// Create new user
router.post(
  '/',
  UserValidation.createUserValidation,
  UserController.createUser
);

// Update a user
router.put(
  '/:id',
  UserValidation.updateUserValidation,
  UserController.updateUser
);

// Delete a user
router.delete(
  '/:id',
  UserValidation.deleteUserValidation,
  UserController.deleteUser
);

export const UserRoutes = router;
