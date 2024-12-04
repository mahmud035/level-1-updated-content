import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { CoffeeService } from './coffee.services.js';

// @desc    Get all coffees
// @route   GET /coffees
const getCoffees = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = { limit, skip };

  const coffees = await CoffeeService.getCoffees(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coffees retrieved successfully',
    meta: { page, limit },
    data: coffees,
  });
};

// @desc    Search coffees
// @route   GET /coffees/search
const searchCoffees = async (req, res, next) => {
  const searchQuery = req.query.q || ''; // NOTE: Empty string means matches all documents.

  // Partial Matching: The `$regex` operator with the `i` option allows case-insensitive partial matching in both `name` and `category` fields.
  const filter = {
    $or: [
      { name: { $regex: searchQuery, $options: 'i' } },
      { category: { $regex: searchQuery, $options: 'i' } },
    ],
  };
  const result = await CoffeeService.searchCoffees(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved searched coffees',
    data: result,
  });
};

// @desc    Get single coffee
// @route   GET /coffees/:id
const getCoffee = async (req, res, next) => {
  const { id } = req.params;
  const coffee = await CoffeeService.getCoffee(id);

  if (!coffee)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Coffee not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coffee retrieved successfully',
    data: coffee,
  });
};

// @desc    Create new coffee
// @route   POST /coffees
const createCoffee = async (req, res, next) => {
  const coffee = req.body;
  const result = await CoffeeService.createCoffee(coffee);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Coffee created successfully',
  });
};

// @desc    Update a coffee
// @route   PUT /coffees/:id
const updateCoffee = async (req, res, next) => {
  const { id } = req.params;
  const coffeeData = req.body;
  const { _id, ...updatedData } = coffeeData; // 👉 Separate _id property from coffee data.
  const result = await CoffeeService.updateCoffee(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coffee updated successfully',
  });
};

// @desc    Delete a coffee
// @route   DELETE /coffees/:id
const deleteCoffee = async (req, res, next) => {
  const { id } = req.params;
  const result = await CoffeeService.deleteCoffee(id);

  if (result.deletedCount === 0)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Coffee not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coffee deleted successfully',
  });
};

export const CoffeeController = {
  getCoffees,
  searchCoffees,
  getCoffee,
  createCoffee,
  updateCoffee,
  deleteCoffee,
};
