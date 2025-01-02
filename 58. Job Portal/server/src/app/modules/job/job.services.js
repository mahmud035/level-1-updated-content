import { ObjectId } from 'mongodb';
import { jobs } from '../../../server.js';

/** 
 * NOTE: If searchQuery and filtering options are provided, the query object will look like this:
    {
      $or: [
        { title: { $regex: "engineer", $options: "i" } },
        { location: { $regex: "engineer", $options: "i" } }
      ],
      jobType: "Remote",
      "salaryRange.min": { $gte: 50000 },
      "salaryRange.max": { $lte: 80000 }
    }
 */

const getJobs = async (filter) => {
  const { limit, skip, searchQuery, jobType, minSalary, maxSalary } = filter;
  const query = {};

  // Search across multiple fields
  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { location: { $regex: searchQuery, $options: 'i' } },
    ];
  }

  // Filter by job type
  if (jobType) query.jobType = jobType;

  // Filter by salary range
  if (minSalary !== null) query['salaryRange.min'] = { $gte: minSalary };
  if (maxSalary !== null) query['salaryRange.max'] = { $lte: maxSalary };

  // Query database with pagination
  const result = await jobs.find(query).skip(skip).limit(limit).toArray();
  const total = await jobs.countDocuments(query);

  return { jobs: result, total };
};

/* 
  const getJobs = async (filter) => {
  const { limit, skip } = filter;
  const query = {};
  const result = await jobs.find(query).limit(limit).skip(skip).toArray();
  const total = await jobs.countDocuments(query);
  return { jobs: result, total };
};

const searchJobs = async (searchQuery) => {
  // Partial Matching: The `$regex` operator with the `i` option allows case-insensitive partial matching in `title` field.
  const filter = {
    $or: [{ title: { $regex: searchQuery, $options: 'i' } }],
  };
  const result = await jobs.find(filter).toArray();
  return result;
};

const filterJobs = async (options) => {
  const { jobType, minSalary, maxSalary } = options;
  const query = {};

  if (jobType) query.jobType = jobType;
  if (minSalary !== null) query['salaryRange.min'] = { $gte: minSalary };
  if (maxSalary !== null) query['salaryRange.max'] = { $lte: maxSalary };

  const result = await jobs.find(query).toArray();
  return result;
};
*/

const getRecruiterJobs = async (recruiterEmail) => {
  const query = { hr_email: recruiterEmail };
  const result = await jobs.find(query).toArray();
  const total = await jobs.countDocuments(query);
  return { jobs: result, total };
};

const getJob = async (jobId) => {
  const query = { _id: new ObjectId(jobId) };
  const result = await jobs.findOne(query);
  return result;
};

const createJob = async (data) => {
  const timestamp = new Date();
  const jobWithTimestamps = {
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  const result = await jobs.insertOne(jobWithTimestamps);
  return result;
};

const updateJob = async (jobId, recruiterEmail, data) => {
  const timestamp = new Date();
  const filter = { _id: new ObjectId(jobId), hr_email: recruiterEmail };
  const updatedJob = { $set: { ...data, updatedAt: timestamp } };
  const result = await jobs.updateOne(filter, updatedJob);
  return result;
};

const deleteJob = async (jobId, recruiterEmail) => {
  const query = { _id: new ObjectId(jobId), hr_email: recruiterEmail };
  const result = await jobs.deleteOne(query);
  return result;
};

export const JobService = {
  getJobs,
  getRecruiterJobs,
  // searchJobs,
  // filterJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
