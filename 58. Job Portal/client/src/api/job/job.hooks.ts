import { useQuery } from '@tanstack/react-query';
import { getJob, getJobs } from './job.api';

//* Queries Hook
export const useGetJobsQuery = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  });
};

export const useGetJobQuery = (id: string) => {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => getJob(id),
  });
};

//* Mutations Hook
