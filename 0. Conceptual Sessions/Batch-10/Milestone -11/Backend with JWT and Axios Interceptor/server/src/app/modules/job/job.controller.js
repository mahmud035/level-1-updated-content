import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { JobService } from './job.services.js';

// @desc    Get jobs with pagination, sorting, searching, and filtering
// @route   GET /jobs
const getJobs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      searchQuery = '',
      ...filters
    } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder,
      searchQuery,
      filters,
    };

    const { jobs, total } = await JobService.getJobs(options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job fetched successfully',
      meta: { page: parseInt(page), limit: parseInt(limit), total },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const JobController = { getJobs };
