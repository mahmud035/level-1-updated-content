import express from 'express';
import { AuthController } from './auth.controller.js';

const router = express.Router();

// Login (Generate Tokens)
router.post('/login', AuthController.loginUser);

// Refresh token (refresh access token)
router.post('/refresh-token', AuthController.refreshAccessToken);

// Logout (Clear Tokens)
router.post('/logout', AuthController.logoutUser);

export const AuthRoutes = router;
