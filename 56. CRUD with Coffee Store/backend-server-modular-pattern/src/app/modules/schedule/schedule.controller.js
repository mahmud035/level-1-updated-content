import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { ScheduleService } from './schedule.services.js';

// @desc    Get all schedules
// @route   GET /schedules
const getSchedules = async (req, res, next) => {
  const result = await ScheduleService.getSchedules();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedules retrieved successfully',
    data: result,
  });
};

// @desc    Get single schedule
// @route   GET /schedules/:id
const getSchedule = async (req, res, next) => {};

// @desc    Create new schedule
// @route   POST /schedules
const createSchedule = async (req, res, next) => {};

// @desc    Update a schedule
// @route   PUT /schedules/:id
const updateSchedule = async (req, res, next) => {};

// @desc    Delete a schedule
// @route   DELETE /schedules/:id
const deleteSchedule = async (req, res, next) => {};

export const ScheduleController = {
  getSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
