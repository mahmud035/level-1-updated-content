import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IDeleteJobApplication,
  ISaveJobApplication,
} from '../../types/jobApplication';
import {
  deleteJobApplication,
  getJobApplications,
  saveJobApplication,
} from './jobApplication.api';

//* Queries Hook
export const useGetJobApplicationsQuery = (email: string) => {
  return useQuery({
    queryKey: ['job-applications', { email }],
    queryFn: () => getJobApplications(email),
  });
};

//* Mutations Hook
export const useSaveJobApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ISaveJobApplication) => saveJobApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
    },
  });
};

export const useDeleteJobApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobInfo: IDeleteJobApplication) =>
      deleteJobApplication(jobInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
    },
  });
};
