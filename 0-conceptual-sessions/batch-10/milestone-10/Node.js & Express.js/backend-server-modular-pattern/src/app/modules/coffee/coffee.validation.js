import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import sendResponse from '../../../shared/sendResponse.js';

const getCoffeeValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid coffee ID',
    });

  next();
};

const createCoffeeValidation = (req, res, next) => {};

const updateCoffeeValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid coffee ID',
    });

  next();
};

const deleteCoffeeValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid coffee ID',
    });

  next();
};

export const CoffeeValidation = {
  getCoffeeValidation,
  createCoffeeValidation,
  updateCoffeeValidation,
  deleteCoffeeValidation,
};
