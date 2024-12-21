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

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs fetched successfully',
    meta: { page, limit },
    data: jobs,
  });
};

// @desc    Get single job
// @route   GET /jobs/:id
const getJob = async (req, res, next) => {};

// @desc    Create new job
// @route   POST /jobs
const createJob = async (req, res, next) => {};

// @desc    Update a job
// @route   PUT /jobs/:id
const updateJob = async (req, res, next) => {};

// @desc    Delete a job
// @route   DELETE /jobs/:id
const deleteJob = async (req, res, next) => {};

export const JobController = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
