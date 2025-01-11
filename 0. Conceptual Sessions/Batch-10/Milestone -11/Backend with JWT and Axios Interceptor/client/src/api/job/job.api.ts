import axiosInstance from '../../config/axios.config';
import {
  ICreateJob,
  IDeleteJob,
  IGetJobsQueryOptions,
  IUpdateJob,
} from '../../types/job';

// Get all jobs with pagination, sorting, searching, and filtering
export const getJobs = async (options: IGetJobsQueryOptions) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    searchQuery = '',
    ...filters
  } = options;

  const { data } = await axiosInstance.get(
    `/jobs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchQuery=${searchQuery}&category=${filters.category}`
  );

  return data;
};

// Get all jobs posted by a specific user
export const getJobsByUser = async (userEmail: string) => {
  const { data } = await axiosInstance.get(`/jobs/user?userEmail=${userEmail}`);
  return data;
};

// Get a single job by its ID
export const getJob = async (jobId: string) => {
  const { data } = await axiosInstance.get(`/jobs/${jobId}`);
  return data;
};

// Create a new job posting
export const createJob = async (jobData: ICreateJob) => {
  const { data } = await axiosInstance.post('/jobs', jobData);
  return data;
};

// Update an existing job by its ID
export const updateJob = async (updateJobInfo: IUpdateJob) => {
  const { jobId, jobOwnerEmail, jobData } = updateJobInfo;

  const { data } = await axiosInstance.patch(
    `/jobs/${jobId}?ownerEmail=${jobOwnerEmail}`,
    jobData
  );
  return data;
};

// Delete a job by its ID
export const deleteJob = async (deleteJobInfo: IDeleteJob) => {
  const { jobId, jobOwnerEmail } = deleteJobInfo;

  const { data } = await axiosInstance.delete(
    `/jobs/${jobId}?ownerEmail=${jobOwnerEmail}`
  );
  return data;
};
