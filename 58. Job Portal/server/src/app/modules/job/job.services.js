import { ObjectId } from 'mongodb';
import { jobs } from '../../../server.js';

const getJobs = async (filter) => {
  const { limit, skip } = filter;
  const query = {};
  const result = await jobs.find(query).limit(limit).skip(skip).toArray();
  return result;
};

const getJob = async (jobId) => {
  const query = { _id: new ObjectId(jobId) };
  const result = await jobs.findOne(query);
  return result;
};

const createJob = async (data) => {
  const result = await jobs.insertOne(data);
  return result;
};

const updateJob = async (jobId, data) => {
  const filter = { _id: new ObjectId(jobId) };
  const options = { upsert: true };
  const updatedJob = { $set: data };
  const result = await jobs.updateOne(filter, updatedJob, options);
  return result;
};

const deleteJob = async (jobId) => {
  const query = { _id: new ObjectId(jobId) };
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
