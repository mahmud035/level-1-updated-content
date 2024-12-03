import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { CoffeeService } from './coffee.services.js';

// @desc    Get all coffees
// @route   GET /coffees
const getCoffees = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const coffees = await CoffeeService.getCoffees(limit);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coffees retrieved successfully',
    data: coffees,
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
  getCoffee,
  createCoffee,
  updateCoffee,
  deleteCoffee,
};
