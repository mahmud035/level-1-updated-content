import { useMutation, useQuery } from '@tanstack/react-query';
import { ISaveJobBid, IUpdateBidStatus } from '../../types/jobBid';
import {
  getAllJobBidsForOwner,
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

// Get all bid requests for a job owner
export const useGetAllJobBidsForOwnerQuery = (ownerEmail: string) => {
  return useQuery({
    queryKey: ['job-bids', 'for-owner', ownerEmail],
    queryFn: () => getAllJobBidsForOwner(ownerEmail),
    enabled: !!ownerEmail,
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
    mutationFn: (jobBidData: ISaveJobBid) => saveJobBid(jobBidData),
  });
};

// Update the status of a specific job bid
export const useUpdateBidStatusMutation = () => {
  return useMutation({
    mutationFn: (updateBidStatusInfo: IUpdateBidStatus) =>
      updateBidStatus(updateBidStatusInfo),
  });
};
