import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ISaveJobApplication } from '../../types/jobApplication';
import { getJobApplications, saveJobApplication } from './jobApplication.api';

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
