import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import {
  IDeleteJobApplication,
  ISaveJobApplication,
} from '../../types/jobApplication';
import {
  deleteJobApplication,
  getJobApplicationCount,
  getJobApplications,
  saveJobApplication,
} from './jobApplication.api';

//* Queries Hook

// NOTE: I need to ensure that queries dependent on user authentication are disabled when the user logs out.

export const useGetJobApplicationsQuery = (userEmail: string) => {
  return useQuery({
    queryKey: ['job-applications', { userEmail }],
    queryFn: () => getJobApplications(userEmail),
    // The query will not execute until the `userEmail` exists (i.e., it is truthy).
    enabled: !!userEmail,
  });
};

export const useGetJobApplicationCountQuery = (jobId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['job-applications', jobId, 'applications', 'count'],
    queryFn: () => getJobApplicationCount(jobId),
    enabled: !!jobId && !!user, // Run only when `jobId` and `user` exist
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
