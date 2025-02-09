import express from 'express';
import { CommentRoutes } from './comment.route.js';
import { ImageRoutes } from './image.route.js';

const router = express.Router();

router.use('/image', ImageRoutes);

router.use('/comment', CommentRoutes);

export default router;
