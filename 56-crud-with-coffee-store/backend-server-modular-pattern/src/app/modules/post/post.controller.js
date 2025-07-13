import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { PostService } from './post.services.js';

// @desc    Get all posts
// @route   GET /posts
const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = { limit, skip };

  const posts = await PostService.getPosts(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    meta: { page, limit },
    data: posts,
  });
};

// @desc    Search posts
// @route   GET /posts/search
const searchPosts = async (req, res, next) => {
  const searchQuery = req.query.q || ''; // NOTE: Empty string means matches all documents.

  // Partial Matching: The `$regex` operator with the `i` option allows case-insensitive partial matching in `title` field.
  const filter = {
    $or: [{ title: { $regex: searchQuery, $options: 'i' } }],
  };
  const posts = await PostService.searchPosts(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve searched posts',
    meta: { total: posts.length },
    data: posts,
  });
};

// @desc    Get single post
// @route   GET /posts/:id
const getPost = async (req, res, next) => {
  const { id } = req.params;
  const post = await PostService.getPost(id);

  if (!post)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Post not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully',
    data: post,
  });
};

// @desc    Create new post
// @route   POST /posts
const createPost = async (req, res, next) => {
  const post = req.body;
  const result = await PostService.createPost(post);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Post created successfully',
  });
};

// @desc    Update a post
// @route   PUT /posts/:id
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await PostService.updatePost(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
  });
};

// @desc    Delete a post
// @route   DELETE /posts/:id
const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const result = await PostService.deletePost(id);

  if (result.deletedCount === 0)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Post not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
  });
};

export const PostController = {
  getPosts,
  searchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
