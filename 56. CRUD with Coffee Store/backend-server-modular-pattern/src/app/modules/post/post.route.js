import express from 'express';
import { PostController } from './post.controller.js';
import { PostValidation } from './post.validation.js';

const router = express.Router();

// Get all posts
router.get('/', PostController.getPosts);

// Search posts
router.get('/search', PostController.searchPosts);

// Get single post
router.get('/:id', PostValidation.getPostValidation, PostController.getPost);

// Create new post
router.post(
  '/',
  PostValidation.createPostValidation,
  PostController.createPost
);

// Update a post
router.put(
  '/:id',
  PostValidation.updatePostValidation,
  PostController.updatePost
);

// Delete a post
router.delete(
  '/:id',
  PostValidation.deletePostValidation,
  PostController.deletePost
);

export const PostRoutes = router;
