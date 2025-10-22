import { ObjectId } from 'mongodb';
import { jobs } from '../../../server.js';
import { buildQueryFromFilters } from './job.utils.js';

/** 
 * NOTE: If searchQuery and filtering options are provided, the query object will look like this:
    {
      $or: [
        { title: { $regex: "engineer", $options: "i" } },
        { category: { $regex: "categoryName", $options: "i" } }
      ],
      category: "Web Development"
    }
 */

/**
 * @desc    Get all jobs with pagination, sorting, searching, and filtering
 * @param   {Object} options - The options for pagination, sorting, search query, and filters
 * @returns {Object} The result containing jobs and total count
 */

const getJobs = async (options) => {
  const { page, limit, sortBy, sortOrder, searchQuery, filters } = options;
  const query = {};

  // 1. Pagination logic (skip and limit)
  const skip = (page - 1) * limit;

  // 2. Sorting logic based on provided field and order
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // 3. Add search query for partial matching and case-insensitivity
  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } }, // Search by job title
      { category: { $regex: searchQuery, $options: 'i' } }, // Search by job category
    ];
  }

  // 4. Apply dynamic filters using utility function
  Object.assign(query, buildQueryFromFilters(filters));

  // 5. Fetch jobs with pagination, sorting, and filtering
  const result = await jobs
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();

  // 6. Get total count of jobs based on the applied filters
  const total = await jobs.countDocuments(query);

  return { jobs: result, total };
};

/**
 * @desc    Get all jobs posted by a specific user
 * @param   {string} userEmail - The email of the user
 * @returns {Promise<Array>} A promise that resolves to a list of jobs posted by the specified user
 */

const getJobsByUser = async (userEmail) => {
  const query = { 'jobOwnerInfo.email': userEmail };
  const sort = { createdAt: 'desc' };
  const result = await jobs.find(query).sort(sort).toArray();
  return result;
};

/**
 * @desc    Get a specific job by its ID
 * @param   {string} jobId - The ID of the job
 * @returns {Object|null} The job data or null if not found
 */

const getJob = async (jobId) => {
  const query = { _id: new ObjectId(jobId) };
  const job = await jobs.findOne(query);
  return job;
};

/**
 * @desc    Create a new job posting
 * @param   {Object} data - The job data to be saved
 * @returns {Object} The result of the insert operation
 */

const createJob = async (data) => {
  const timeStamps = new Date();
  const jobDataWithTimeStamps = {
    ...data,
    createdAt: timeStamps,
    updatedAt: timeStamps,
  };
  const result = await jobs.insertOne(jobDataWithTimeStamps);
  return result;
};

/**
 * @desc    Update an existing job by its ID
 * @param   {string} jobId - The ID of the job to update
 * @param   {Object} data - The updated job data
 * @param   {string} jobOwnerEmail - The email of the job owner
 * @returns {Object} The result of the update operation
 */

const updateJob = async (jobId, data, jobOwnerEmail) => {
  const timeStamps = new Date();
  const filter = {
    _id: new ObjectId(jobId),
    'jobOwnerInfo.email': jobOwnerEmail,
  };
  const updatedJob = { $set: { ...data, updatedAt: timeStamps } };
  const result = await jobs.updateOne(filter, updatedJob);
  return result;
};

/**
 * @desc    Delete a job by its ID
 * @param   {string} jobId - The ID of the job to delete
 * @param   {string} jobOwnerEmail - The email of the job owner
 * @returns {Object} The result of the delete operation
 */

const deleteJob = async (jobId, jobOwnerEmail) => {
  const query = {
    _id: new ObjectId(jobId),
    'jobOwnerInfo.email': jobOwnerEmail,
  };
  const result = await jobs.deleteOne(query);
  return result;
};

export const JobService = {
  getJobs,
  getJob,
  getJobsByUser,
  createJob,
  updateJob,
  deleteJob,
};
