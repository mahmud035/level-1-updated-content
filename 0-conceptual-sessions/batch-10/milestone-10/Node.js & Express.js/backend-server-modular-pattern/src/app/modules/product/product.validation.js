import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import sendResponse from '../../../shared/sendResponse.js';

const getProductValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid product ID',
    });

  next();
};

const createProductValidation = (req, res, next) => {
  const product = req.body;

  if (!product?.name || !product.price)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide product name & price',
    });

  next();
};

const updateProductValidation = (req, res, next) => {
  const { id } = req.params;
  const product = req.body;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid product ID',
    });

  if (!product?.name || !product.price)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide product name & price',
    });

  next();
};

const deleteProductValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid product ID',
    });

  next();
};

export const ProductValidation = {
  getProductValidation,
  createProductValidation,
  updateProductValidation,
  deleteProductValidation,
};
