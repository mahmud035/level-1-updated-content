import express from 'express';
import { AuthController } from './auth.controller.js';

const router = express.Router();

// Login (Generate Tokens)
router.post('/login', AuthController.loginUser);

// Logout (Clear Tokens)
router.post('/logout', AuthController.logoutUser);

export const AuthRoutes = router;
