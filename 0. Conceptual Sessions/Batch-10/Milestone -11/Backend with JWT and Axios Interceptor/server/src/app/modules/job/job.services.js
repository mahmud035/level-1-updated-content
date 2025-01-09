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
      category: "Engineering"
    }
 */

const getJobs = async (options) => {
  const { page, limit, sortBy, sortOrder, searchQuery, filters } = options;
  const query = {};

  // 1. Pagination
  const skip = (page - 1) * limit;

  // 2. Sorting
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // 3. Add searchQuery for partial and case-insensitive matching
  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } }, // Search by title
      { category: { $regex: searchQuery, $options: 'i' } }, // Search by category
    ];
  }

  // 4. Add filters dynamically using the utility function
  Object.assign(query, buildQueryFromFilters(filters));

  const result = await jobs
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
  const total = await jobs.countDocuments(query);

  return { jobs: result, total };
};

const getJob = async (jobId) => {
  const query = { _id: new ObjectId(jobId) };
  const job = await jobs.findOne(query);
  return job;
};

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

const updateJob = async (jobId, data, jobOwnerEmail) => {
  const timeStamps = new Date();
  const filter = { _id: new ObjectId(jobId), email: jobOwnerEmail };
  const updatedJob = { $set: { ...data, updatedAt: timeStamps } };
  const result = await jobs.updateOne(filter, updatedJob);
  return result;
};

const deleteJob = async (jobId, jobOwnerEmail) => {
  const query = { _id: new ObjectId(jobId), email: jobOwnerEmail };
  const result = await jobs.deleteOne(query);
  return result;
};

export const JobService = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
