import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { JobService } from './job.services.js';

/**
 * NOTE: Unified API Usage Examples
 
 * Pagination Only
 * GET /jobs?page=1&limit=10
 
 * Sorting Only
 * GET /jobs?sortBy=createdAt&sortOrder=desc
 
 * Searching Only
 * GET /jobs?searchQuery=
 
 * Filtering Only
 * GET /jobs?title=job
 
 * Combined All
 * GET /api/v1/jobs?page=1&limit=10&sortBy=createdAt&sortOrder=desc&searchQuery=developer&title=job
 */

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
      message: 'Jobs fetched successfully',
      meta: { page: parseInt(page), limit: parseInt(limit), total },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single job
// @route   GET /jobs/:jobId
const getJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await JobService.getJob(jobId);

    if (!job)
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Job not found',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job fetched successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job
// @route   POST /jobs
const createJob = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    const result = await JobService.createJob(data);

    if (!result.insertedId)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Something went wrong!',
      });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Jobs created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job
// @route   PATCH /jobs/:jobId?ownerEmail=
const updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { ...data } = req.body;
    const { ownerEmail: jobOwnerEmail } = req.query;
    const authenticatedEmail = req?.user?.email;

    if (jobOwnerEmail !== authenticatedEmail)
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        message: 'Forbidden access: You are not the job owner',
      });

    const result = await JobService.updateJob(jobId, data, jobOwnerEmail);

    if (result.modifiedCount === 0)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Job not found or no changes made',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job
// @route   DELETE /jobs/:jobId?ownerEmail=
const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { ownerEmail: jobOwnerEmail } = req.query;
    const authenticatedEmail = req?.user?.email;

    if (jobOwnerEmail !== authenticatedEmail)
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        message: 'Forbidden access: You are not the job owner',
      });

    const result = await JobService.deleteJob(jobId, jobOwnerEmail);

    if (result.deletedCount === 0)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Job not found',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const JobController = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
