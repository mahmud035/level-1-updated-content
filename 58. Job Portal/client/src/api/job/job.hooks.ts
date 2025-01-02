import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IJob } from '../../types/job';
import { getJob, getJobs } from './job.api';

//* Queries Hook
export const useGetJobsQuery = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  });
};

export const useGetJobQuery = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => getJob(id),
    initialData: () =>
      (
        queryClient.getQueryData(['jobs']) as { data: IJob[] | undefined }
      )?.data?.find((d: IJob) => d._id === id),

    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['todos'])?.dataUpdatedAt,
  });
};

//* Mutations Hook
