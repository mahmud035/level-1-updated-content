import { ObjectId } from 'mongodb';
import { jobBids, jobs } from '../../../server.js';

/**
 * @desc    Fetch all bids placed by a specific user
 * @param   {string} userEmail - The email of the user placing the bids
 * @returns {Promise<Array>} A promise that resolves to a list of all bids placed by the specified user
 */

const getJobBidsByUser = async (userEmail) => {
  const query = { bidderEmail: userEmail };
  const sort = { createdAt: 'desc' };
  const result = await jobBids.find(query).sort(sort).toArray();
  return result;
};

/**
 * @desc    Fetch all job bids placed for jobs owned by a specific owner
 * @param   {string} ownerEmail - The email of the job owner for whom to fetch bids
 * @returns {Promise<Array>} A promise that resolves to a list of all bids placed by the specified job owner
 */

const getAllJobBidsForOwner = async (ownerEmail) => {
  const query = { jobOwnerEmail: ownerEmail };
  const sort = { createdAt: 'desc' };
  const result = await jobBids.find(query).sort(sort).toArray();
  return result;
};

/**
 * @desc    Fetch all bids for a specific job posted by the job owner
 * @param   {string} jobId - The ID of the job to fetch bids for
 * @param   {string} ownerEmail - The email of the job owner
 * @returns {Promise<Array>} A promise that resolves to a list of all bids for the specified job
 */

const getJobBidsByJobOwner = async (jobId, ownerEmail) => {
  const query = { jobId: jobId, jobOwnerEmail: ownerEmail };
  const sort = { createdAt: 'desc' };
  const result = await jobBids.find(query).sort(sort).toArray();
  return result;
};

/**
 * @desc    Save a new bid for a job
 * @param   {Object} bidData - The data of the bid being placed
 * @returns {Object} The result of the insert operation
 * @throws  {Error} If the user has already placed a bid for this job
 */

const saveJobBid = async (bidData) => {
  const timeStamps = new Date();
  const bidDataWithTimeStamps = {
    ...bidData,
    createdAt: timeStamps,
    updatedAt: timeStamps,
  };

  // Ensure the bidder has not already placed a bid for this job
  const query = { jobId: bidData.jobId, bidderEmail: bidData.bidderEmail };
  const alreadyApplied = await jobBids.findOne(query);

  if (alreadyApplied) {
    throw new Error('You have already placed a bid for this job.');
  }

  // Insert the new bid data into the database
  const result = await jobBids.insertOne(bidDataWithTimeStamps);

  // Increment the bid count for the job in the jobs collection
  const jobQuery = { _id: new ObjectId(bidData.jobId) };
  const updateDoc = { $inc: { bidCount: 1 } };
  const updateBidCount = await jobs.updateOne(jobQuery, updateDoc);

  return result;
};

/**
 * @desc     Updates the status of a specific job bid and performs related updates in the database.
 * @param   {string} jobBidId - The unique identifier of the job bid that needs to be updated
 * @param   {string} jobId - The unique identifier of the job associated with the bid
 * @param   {Object} status - The status object containing the new status
 * @returns {Object} The result of the update operation
 * @throws  {Error} If the status is not supported
 */

const updateBidStatus = async (jobBidId, jobId, status) => {
  console.log(`Updating bid status to: ${status.status}`);

  // NOTE: If the status is `In Progress`, we:
  // 1. Mark the selected bid as `In Progress`.
  // 2. Mark all other bids for the same job as `Rejected`.
  // 3. Update the job to stop accepting bid requests.
  if (status?.status === 'In Progress') {
    const selectedBidQuery = { _id: new ObjectId(jobBidId), jobId: jobId };
    const otherBidsQuery = { _id: { $ne: new ObjectId(jobBidId) }, jobId };
    const jobQuery = { _id: new ObjectId(jobId) };

    const updateSelectedBid = { $set: status };
    const updateOtherBids = { $set: { status: `Rejected` } };
    const updateJob = { $set: { acceptingBidRequest: false } };

    const result = await jobBids.updateOne(selectedBidQuery, updateSelectedBid);
    await jobBids.updateMany(otherBidsQuery, updateOtherBids);
    await jobs.updateOne(jobQuery, updateJob);

    return result;
  }

  // NOTE: If the status is `Rejected`, we:
  // 1. Mark the specific bid as `Rejected`.
  // 2. Re-enable bid requests for the job.
  if (status?.status === 'Rejected') {
    const bidQuery = { _id: new ObjectId(jobBidId), jobId: jobId };
    const jobQuery = { _id: new ObjectId(jobId) };

    const updateBid = { $set: status };
    const updateJob = { $set: { acceptingBidRequest: true } };

    const result = await jobBids.updateOne(bidQuery, updateBid);
    await jobs.updateOne(jobQuery, updateJob);

    return result;
  }

  // NOTE: If the status is `Completed`, we:
  // 1. Mark the specific bid as `Completed`.
  // 2. Mark the job as completed.
  if (status?.status === 'Completed') {
    const bidQuery = { _id: new ObjectId(jobBidId), jobId: jobId };
    const jobQuery = { _id: new ObjectId(jobId) };

    const updateBid = { $set: status };
    const updateJob = { $set: { isCompleted: true } };

    const result = await jobBids.updateOne(bidQuery, updateBid);
    await jobs.updateOne(jobQuery, updateJob);

    return result;
  }
};

export const JobBidService = {
  getJobBidsByUser,
  getAllJobBidsForOwner,
  getJobBidsByJobOwner,
  saveJobBid,
  updateBidStatus,
};
