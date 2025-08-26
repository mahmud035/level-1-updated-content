import express from 'express';
import { ImageController } from '../controllers/image.controller.js';

const router = express.Router();

router.post('/create', ImageController.insertAiImage);

router.get('/all', ImageController.getAllImage);

router.get('/single/:id', ImageController.getSingleImage);

export const ImageRoutes = router;
