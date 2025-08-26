import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { ProductService } from './product.services.js';

// @desc    Get all products
// @route   GET /products
const getProducts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = { limit, skip };

  const products = await ProductService.getProducts(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    meta: { page, limit },
    data: products,
  });
};

// @desc    Search products
// @route   GET /products/search
const searchProducts = async (req, res, next) => {
  const searchQuery = req.query.q || ''; // NOTE: Empty string means matches all documents.

  // Partial Matching: The `$regex` operator with the `i` option allows case-insensitive partial matching in `name` field.
  const filter = {
    $or: [{ name: { $regex: searchQuery, $options: 'i' } }],
  };
  const result = await ProductService.searchProducts(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved searched products',
    data: result,
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
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
