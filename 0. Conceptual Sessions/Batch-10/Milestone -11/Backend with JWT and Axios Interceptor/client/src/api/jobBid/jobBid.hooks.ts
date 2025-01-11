import { useMutation, useQuery } from '@tanstack/react-query';
import { IJobBid, IUpdateBidStatus } from '../../types/jobBid';
import {
  getJobBidsByJobOwner,
  getJobBidsByUser,
  saveJobBid,
  updateBidStatus,
} from './jobBid.api';

//* Query Hooks
// Get all job bids placed by a specific user
export const useGetJobBidsByUserQuery = (userEmail: string) => {
  return useQuery({
    queryKey: ['job-bids', 'user', userEmail],
    queryFn: () => getJobBidsByUser(userEmail),
    enabled: !!userEmail,
  });
};

// Get all bids for a specific job posted by the job owner
export const useGetJobBidsByJobOwnerQuery = (
  jobId: string,
  jobOwnerEmail: string
) => {
  return useQuery({
    queryKey: ['job-bids', 'for-owner', { jobId, jobOwnerEmail }],
    queryFn: () => getJobBidsByJobOwner(jobId, jobOwnerEmail),
    enabled: !!jobId && !!jobOwnerEmail,
  });
};

//* Mutation Hooks
// Save a new bid for a job
export const useSaveJobBidMutation = () => {
  return useMutation({
    mutationFn: (jobBidData: IJobBid) => saveJobBid(jobBidData),
  });
};

// TODO: Update bid status
export const useUpdateBidStatus = () => {
  return useMutation({
    mutationFn: (updateBidStatusInfo: IUpdateBidStatus) =>
      updateBidStatus(updateBidStatusInfo),
  });
};
