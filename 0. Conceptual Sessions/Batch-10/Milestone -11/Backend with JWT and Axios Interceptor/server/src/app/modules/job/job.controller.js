import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { JobService } from './job.services.js';

/**
 * NOTE: Unified API Usage Examples
 *
 * Pagination Only
 * GET /jobs?page=1&limit=10
 *
 * Sorting Only
 * GET /jobs?sortBy=createdAt&sortOrder=desc
 *
 * Searching Only
 * GET /jobs?searchQuery=
 *
 * Filtering Only
 * GET /jobs?title=job
 *
 * Combined All
 * GET /api/v1/jobs?page=1&limit=10&sortBy=createdAt&sortOrder=desc&searchQuery=developer&title=job
 */

/**
 * @desc    Get all jobs with pagination, sorting, searching, and filtering
 * @route   GET /jobs
 * @param   {Object} req - The request object containing query parameters like page, limit, sortBy, etc.
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with a list of jobs, pagination meta data, and status
 */

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
      message: 'Jobs retrieved successfully.',
      meta: { page: parseInt(page), limit: parseInt(limit), total },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all jobs posted by a specific user
 * @route   GET /jobs/user?userEmail=
 * @param   {Object} req - The request object containing userEmail query parameter
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with a list of jobs posted by the user
 */

const getJobsByUser = async (req, res, next) => {
  try {
    const { userEmail } = req.query;
    const userJobs = await JobService.getJobsByUser(userEmail);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Jobs posted by the user retrieved successfully.',
      data: userJobs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a specific job by its ID
 * @route   GET /jobs/:jobId
 * @param   {Object} req - The request object containing the jobId parameter
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with the job data or an error message if not found
 */

const getJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await JobService.getJob(jobId);

    if (!job)
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Job not found.',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job retrieved successfully.',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new job posting
 * @route   POST /jobs
 * @param   {Object} req - The request object containing the job data in the body
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with a success or failure message
 */

const createJob = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    const result = await JobService.createJob(data);

    if (!result.insertedId)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Failed to create the job posting.',
      });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Job posted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing job by its ID
 * @route   PATCH /jobs/:jobId?ownerEmail=
 * @param   {Object} req - The request object containing the jobId parameter and the updated data in the body
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with the result of the update operation
 */

const updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { ...data } = req.body;
    const { ownerEmail: jobOwnerEmail } = req.query;
    const authenticatedEmail = req?.user?.email;

    if (jobOwnerEmail !== authenticatedEmail)
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        message: 'Forbidden: You are not authorized to modify this job.',
      });

    const result = await JobService.updateJob(jobId, data, jobOwnerEmail);

    if (result.modifiedCount === 0)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Job not found or no changes made.',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a job by its ID
 * @route   DELETE /jobs/:jobId?ownerEmail=
 * @param   {Object} req - The request object containing the jobId parameter and ownerEmail query parameter
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with the result of the delete operation
 */

const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { ownerEmail: jobOwnerEmail } = req.query;
    const authenticatedEmail = req?.user?.email;

    if (jobOwnerEmail !== authenticatedEmail)
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        message: 'Forbidden: You are not authorized to delete this job.',
      });

    const result = await JobService.deleteJob(jobId, jobOwnerEmail);

    if (result.deletedCount === 0)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Job not found.',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const JobController = {
  getJobs,
  getJobsByUser,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
