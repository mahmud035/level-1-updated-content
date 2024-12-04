import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import sendResponse from '../../../shared/sendResponse.js';

const getScheduleValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid schedule ID',
    });

  next();
};

const createScheduleValidation = (req, res, next) => {
  const schedule = req.body;

  if (!schedule.title || !schedule.day || !schedule.date || !schedule.time)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide schedule title, day, date & time',
    });

  next();
};

const updateScheduleValidation = (req, res, next) => {
  const { id } = req.params;
  const schedule = req.body;

  // Check if the provided id is valid MongDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid schedule ID',
    });

  if (!schedule.title || !schedule.day || !schedule.date || !schedule.time)
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide schedule title, day, date & time',
    });

  next();
};

const deleteScheduleValidation = (req, res, next) => {
  const { id } = req.params;

  // Check if the provided id is valid MongDB ObjectId
  if (!ObjectId.isValid(id))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid schedule ID',
    });

  next();
};

export const ScheduleValidation = {
  getScheduleValidation,
  createScheduleValidation,
  updateScheduleValidation,
  deleteScheduleValidation,
};
