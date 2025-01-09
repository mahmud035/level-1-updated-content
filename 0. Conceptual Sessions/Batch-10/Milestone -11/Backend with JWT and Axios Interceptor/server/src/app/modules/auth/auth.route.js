import express from 'express';
import { AuthController } from './auth.controller.js';

const router = express.Router();

// Register (Save new user into db)
router.post('/register', AuthController.registerUser);

// Login (Generate Tokens)
router.post('/login', AuthController.loginUser);

// Refresh token (refresh access token)
router.post('/refresh-token', AuthController.refreshAccessToken);

// Logout (Clear Tokens)
router.post('/logout', AuthController.logoutUser);

export const AuthRoutes = router;
