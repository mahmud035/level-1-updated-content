import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { UserService } from './user.services.js';

// @desc    Get all users
// @route   GET /users
const getUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = { limit, skip };

  const users = await UserService.getUsers(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: { page, limit },
    data: users,
  });
};

// @desc    Search users
// @route   GET /users/search
const searchUsers = async (req, res, next) => {
  const searchQuery = req.query.q || ''; // NOTE: Empty string means matches all documents.

  // Partial Matching: The `$regex` operator with the `i` option allows case-insensitive partial matching in `name` field.
  const filter = {
    $or: [{ name: { $regex: searchQuery, $options: 'i' } }],
  };
  const result = await UserService.searchUsers(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved searched users',
    data: result,
  });
};

// @desc    Get single user
// @route   GET /users/:id
const getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.getUser(id);

  if (!user)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
};

// @desc    Create new user
// @route   POST /users
const createUser = async (req, res, next) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
  });
};

// @desc    Update a user
// @route   PUT /users/:id
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await UserService.updateUser(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
  });
};

// @desc    Delete a user
// @route   DELETE /users/:id
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  if (result.deletedCount === 0)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
  });
};

export const UserController = {
  getUsers,
  searchUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
