import axiosInstance from '../../config/axios.config';
import { IJobBid, IUpdateBidStatus } from '../../types/jobBid';

// Get all job bids placed by a specific user
export const getJobBidsByUser = async (userEmail: string) => {
  const { data } = await axiosInstance.get(
    `/job-bids/user?userEmail=${userEmail}`
  );
  return data;
};

// Get all bids for a specific job posted by the job owner
export const getJobBidsByJobOwner = async (
  jobId: string,
  jobOwnerEmail: string
) => {
  const { data } = await axiosInstance.get(
    `/job-bids/${jobId}/for-owner?ownerEmail=${jobOwnerEmail}`
  );
  return data;
};

// Save a new bid for a job
export const saveJobBid = async (jobBidData: IJobBid) => {
  const { data } = await axiosInstance.post(`/job-bids`, jobBidData);
  return data;
};

// Update bid status
export const updateBidStatus = async (
  updateBidStatusInfo: IUpdateBidStatus
) => {
  const { jobId, status } = updateBidStatusInfo;

  const { data } = await axiosInstance.patch(`/job-bids/bid/${jobId}`, status);
  return data;
};
