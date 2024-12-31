import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { JobService } from './job.services.js';

/**
 * NOTE: Unified API Usage Examples
 
 * Pagination Only
 * GET /jobs?page=2&limit=5
 *
 * Search Only
 * GET /jobs?q=developer
 *
 * Filter Only
 * GET /jobs?jobType=Remote&minSalary=5000
 *
 * Combine All
 * GET /jobs?q=developer&jobType=Remote&minSalary=50000&page=1&limit=10
 
 */

// @desc    Get jobs with pagination, searching, and filtering
// @route   GET /jobs
const getJobs = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Searching
    const searchQuery = req.query.q || ''; // NOTE: Empty string means matches all documents.

    // Filtering
    const jobType = req.query.jobType || null;
    const minSalary = req.query.minSalary
      ? parseInt(req.query.minSalary)
      : null;
    const maxSalary = req.query.maxSalary
      ? parseInt(req.query.maxSalary)
      : null;

    const filter = { limit, skip, searchQuery, jobType, minSalary, maxSalary };
    const { jobs, total } = await JobService.getJobs(filter);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Jobs fetched successfully',
      meta: { page, limit, total },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

/* 
// @desc    Get all jobs
// @route   GET /jobs
const getJobs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const filter = { limit, skip };

    const { jobs, total } = await JobService.getJobs(filter);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Jobs fetched successfully',
      meta: { page, limit, total },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search jobs
// @route   GET /jobs/search?q=
const searchJobs = async (req, res, next) => {
  try {
    const searchQuery = req.query.q || ''; // NOTE: Empty string means matches all documents.
    const jobs = await JobService.searchJobs(searchQuery);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Searched jobs fetch successfully',
      meta: { total: jobs.length },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Filter jobs
// @route   GET /jobs/filter?jobType=Hybrid&minSalary=50000&maxSalary=80000
const filterJobs = async (req, res, next) => {
  try {
    const jobType = req.query.jobType || null;
    const minSalary = req.query.minSalary
      ? parseInt(req.query.minSalary)
      : null;
    const maxSalary = req.query.maxSalary
      ? parseInt(req.query.maxSalary)
      : null;
    const options = { jobType, minSalary, maxSalary };

    const jobs = await JobService.filterJobs(options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Filter jobs fetch successfully',
      meta: { total: jobs.length },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
}; 
*/

// @desc    Get single job
// @route   GET /jobs/:id
const getJob = async (req, res, next) => {
  try {
    const jobId = req.params;
    const job = await JobService.getJob(jobId);

    if (!job)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
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

// @desc    Create new job
// @route   POST /jobs
const createJob = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await JobService.createJob(data);

    if (!result.insertedId)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Something went wrong',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job
// @route   PUT /jobs/:id
const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params;
    const data = req.body;

    const result = await JobService.updateJob(jobId, data);

    if (result.modifiedCount === 0)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Job not found',
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
// @route   DELETE /jobs/:id
const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params;
    const result = await JobService.deleteJob(jobId);

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
  // searchJobs,
  // filterJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
