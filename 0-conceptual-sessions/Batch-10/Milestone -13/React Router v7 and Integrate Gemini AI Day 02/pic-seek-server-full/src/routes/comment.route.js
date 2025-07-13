import express from 'express';
import { CommentController } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', CommentController.postUserComment);

export const CommentRoutes = router;
