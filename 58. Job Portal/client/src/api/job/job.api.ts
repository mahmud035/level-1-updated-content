import axiosInstance from '../../config/axios.config';
import {
  IAddJob,
  IDeleteJob,
  IGetJobsQueryOptions,
  IUpdateJob,
} from '../../types/job';

export const getJobs = async (options: IGetJobsQueryOptions) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'asc',
    searchQuery = '',
    ...filters
  } = options;

  const { data } = await axiosInstance.get(
    `/jobs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchQuery=${searchQuery}&salaryRange.min=${filters?.minSalary}&salaryRange.max=${filters?.maxSalary}`
  );
  return data;
};

export const getJob = async (jobId: string) => {
  const { data } = await axiosInstance.get(`/jobs/${jobId}`);
  return data;
};

export const getRecruiterJobs = async (recruiterEmail: string) => {
  const { data } = await axiosInstance.get(
    `/jobs/recruiter-jobs?email=${recruiterEmail}`
  );
  return data;
};

export const createJob = async (jobData: IAddJob) => {
  const { data } = await axiosInstance.post('/jobs', jobData);
  return data;
};

export const updateJob = async ({
  jobId,
  recruiterEmail,
  jobData,
}: IUpdateJob) => {
  const { data } = await axiosInstance.patch(
    `jobs/${jobId}?email=${recruiterEmail}`,
    jobData
  );
  return data;
};

export const deleteJob = async ({ jobId, recruiterEmail }: IDeleteJob) => {
  const { data } = await axiosInstance.delete(
    `jobs/${jobId}?email=${recruiterEmail}`
  );
  return data;
};
