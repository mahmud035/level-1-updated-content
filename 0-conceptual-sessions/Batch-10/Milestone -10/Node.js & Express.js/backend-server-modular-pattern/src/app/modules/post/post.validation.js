import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import sendResponse from '../../../shared/sendResponse.js';

const getPostValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid post ID',
    });

  next();
};

const createPostValidation = (req, res, next) => {
  const post = req.body;

  if (!post.title)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide post title',
    });

  next();
};

const updatePostValidation = (req, res, next) => {
  const { id } = req.params;
  const post = req.body;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid post ID',
    });

  if (!post.title)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide post title',
    });

  next();
};

const deletePostValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid post ID',
    });

  next();
};

export const PostValidation = {
  getPostValidation,
  createPostValidation,
  updatePostValidation,
  deletePostValidation,
};
