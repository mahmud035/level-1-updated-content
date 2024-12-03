import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { ProductService } from './product.services.js';

// @desc    Get all products
// @route   GET /products
const getProducts = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const products = await ProductService.getProducts(limit);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  });
};

// @desc    Get single product
// @route   GET /products/:id
const getProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductService.getProduct(id);

  if (!product)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  });
};

// @desc    Create new product
// @route   POST /products
const createProduct = async (req, res, next) => {
  const product = req.body;
  const result = await ProductService.createProduct(product);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
  });
};

// @desc    Update a product
// @route   PUT /products/:id
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await ProductService.updateProduct(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
  });
};

// @desc    Delete a product
// @route   DELETE /products/:id
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id);

  if (result.deletedCount === 0)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
  });
};

export const ProductController = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
