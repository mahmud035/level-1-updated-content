import axiosInstance from '../../config/axios.config';
import { IAddJob, IDeleteJob, IUpdateJob } from '../../types/job';

export const getJobs = async (page = 1, searchQuery = '') => {
  const { data } = await axiosInstance.get(
    `/jobs?page=${page}&q=${searchQuery}`
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
