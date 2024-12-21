import { jobs } from '../../../server.js';

const getJobs = async (filter) => {
  const { limit, skip } = filter;
  const query = {};
  const result = await jobs.find(query).limit(limit).skip(skip).toArray();
  return result;
};

const getJob = async (id) => {};

const createJob = async (data) => {};

const updateJob = async (id, updatedData) => {};

const deleteJob = async (id) => {};

export const JobService = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
