import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import sendResponse from '../../../shared/sendResponse.js';

const getUserValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is a valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid user ID',
    });

  next();
};

const createUserValidation = (req, res, next) => {
  const user = req.body;

  if (!user?.name || !user?.email)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide name & email',
    });

  next();
};

const updateUserValidation = (req, res, next) => {
  const { id } = req.params;
  const user = req.body;

  // Check if the provided id is a valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid user ID',
    });

  if (!user?.name && !user?.email)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide name & email',
    });

  next();
};

const deleteUserValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is a valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid user ID',
    });

  next();
};

export const UserValidation = {
  getUserValidation,
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
};
