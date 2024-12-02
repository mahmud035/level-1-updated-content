import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/posts.controller.js';

const router = express.Router();

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:id', getPost);

// Create post
router.post('/', createPost);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);

export default router;
