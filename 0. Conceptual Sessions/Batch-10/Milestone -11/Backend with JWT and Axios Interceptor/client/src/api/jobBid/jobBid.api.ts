import axiosInstance from '../../config/axios.config';
import { ISaveJobBid, IUpdateBidStatus } from '../../types/jobBid';

// Get all job bids placed by a specific user
export const getJobBidsByUser = async (userEmail: string) => {
  const { data } = await axiosInstance.get(
    `/job-bids/user?userEmail=${userEmail}`
  );
  return data;
};

// Get all bid requests for a job owner
export const getAllJobBidsForOwner = async (ownerEmail: string) => {
  const { data } = await axiosInstance.get(
    `/job-bids/for-owner?ownerEmail=${ownerEmail}`
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
export const saveJobBid = async (jobBidData: ISaveJobBid) => {
  const { data } = await axiosInstance.post(`/job-bids`, jobBidData);
  return data;
};

// Update the status of a specific job bid
export const updateBidStatus = async (
  updateBidStatusInfo: IUpdateBidStatus
) => {
  const { jobBidId, jobId, status } = updateBidStatusInfo;

  const { data } = await axiosInstance.patch(`/job-bids/bid/${jobBidId}`, {
    jobId,
    status,
  });
  return data;
};
