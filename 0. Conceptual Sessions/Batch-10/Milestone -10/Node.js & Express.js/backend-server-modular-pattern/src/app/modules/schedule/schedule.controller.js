import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { ScheduleService } from './schedule.services.js';

// @desc    Get all schedules
// @route   GET /schedules
const getSchedules = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = { limit, skip };

  const schedules = await ScheduleService.getSchedules(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedules retrieved successfully',
    meta: { page, limit },
    data: schedules,
  });
};

// @desc    Search schedule
// @route   GET /schedules/search
const searchSchedule = async (req, res, next) => {
  // NOTE: Empty string means matches all documents.
  const searchQuery = req.query.q || '';

  // Partial Matching: The `$regex` operator with the `i` option allows case-insensitive partial matching in both `title` and `day` fields.
  const filter = {
    $or: [
      { title: { $regex: searchQuery, $options: 'i' } },
      { day: { $regex: searchQuery, $options: 'i' } },
    ],
  };
  const result = await ScheduleService.searchSchedule(filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved searched schedules',
    data: result,
  });

  // ChatGPT: https://chatgpt.com/share/67500655-7e94-8009-8f28-62ed1479a013
};

// @desc    Get single schedule
// @route   GET /schedules/:id
const getSchedule = async (req, res, next) => {
  const { id } = req.params;
  const schedule = await ScheduleService.getSchedule(id);

  if (!schedule)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Schedule not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule retrieved successfully',
    data: schedule,
  });
};

// @desc    Create new schedule
// @route   POST /schedules
const createSchedule = async (req, res, next) => {
  const schedule = req.body;
  const result = await ScheduleService.createSchedule(schedule);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Schedule created successfully',
  });
};

// @desc    Update a schedule
// @route   PUT /schedules/:id
const updateSchedule = async (req, res, next) => {
  const { id } = req.params;
  const scheduleData = req.body;
  const { _id, ...updatedData } = scheduleData; // 👉 Separate _id from schedule data.
  const result = await ScheduleService.updateSchedule(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule updated successfully',
  });
};

// @desc    Delete a schedule
// @route   DELETE /schedules/:id
const deleteSchedule = async (req, res, next) => {
  const { id } = req.params;
  const result = await ScheduleService.deleteSchedule(id);

  if (result.deletedCount === 0)
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Schedule not found',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule deleted successfully',
  });
};

export const ScheduleController = {
  getSchedules,
  searchSchedule,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
