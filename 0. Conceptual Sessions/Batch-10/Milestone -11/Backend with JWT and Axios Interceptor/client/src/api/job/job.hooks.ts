import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
  ICreateJob,
  IDeleteJob,
  IGetJobsQueryOptions,
  IUpdateJob,
} from '../../types/job';
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByUser,
  updateJob,
} from './job.api';

//* Query Hooks
// Get all jobs with pagination, sorting, searching, and filtering
export const useGetJobsQuery = (options?: IGetJobsQueryOptions) => {
  return useQuery({
    queryKey: ['/jobs', options],
    queryFn: () => getJobs(options || {}),
    placeholderData: keepPreviousData,
  });
};

// Get all jobs posted by a specific user
export const useGetJobsByUserQuery = (userEmail: string) => {
  return useQuery({
    queryKey: ['jobs', 'user', userEmail],
    queryFn: () => getJobsByUser(userEmail),
    enabled: !!userEmail,
  });
};

// Get a single job by its ID
export const useGetJobQuery = (jobId: string) => {
  return useQuery({
    queryKey: ['jobs', jobId],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
  });
};

//* Mutation Hooks
// Create a new job posting
export const useCreateJobMutation = () => {
  return useMutation({
    mutationFn: (jobData: ICreateJob) => createJob(jobData),
  });
};

// Update an existing job by its ID
export const useUpdateJobMutation = () => {
  return useMutation({
    mutationFn: (updateJobInfo: IUpdateJob) => updateJob(updateJobInfo),
  });
};

// Delete a job by its ID
export const useDeleteJobMutation = () => {
  return useMutation({
    mutationFn: (deleteJobInfo: IDeleteJob) => deleteJob(deleteJobInfo),
  });
};
