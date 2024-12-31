import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { JobService } from './job.services.js';

// @desc    Get all jobs
// @route   GET /jobs
const getJobs = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;
  const filter = { limit, skip };

  const jobs = await JobService.getJobs(filter);

  if (!Array.isArray(jobs))
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Something went wrong',
    });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs fetched successfully',
    meta: { page, limit, total: jobs.length },
    data: jobs,
  });
};

// @desc    Get single job
// @route   GET /jobs/:id
const getJob = async (req, res, next) => {
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
};

// @desc    Create new job
// @route   POST /jobs
const createJob = async (req, res, next) => {
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
};

// @desc    Update a job
// @route   PUT /jobs/:id
const updateJob = async (req, res, next) => {
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
};

// @desc    Delete a job
// @route   DELETE /jobs/:id
const deleteJob = async (req, res, next) => {
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
};

export const JobController = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
