import { ObjectId } from 'mongodb';
import { jobBids, jobs } from '../../../server.js';

/**
 * @desc    Fetch all bids placed by a specific user
 * @param   {string} userEmail - The email of the user placing the bids
 * @returns {Promise<Array>} A promise that resolves to a list of all bids placed by the specified user
 */

const getJobBidsByUser = async (userEmail) => {
  const query = { bidderEmail: userEmail };
  const result = await jobBids.find(query).toArray();
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
  const result = await jobBids.find(query).toArray();
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
 * @desc    Update the status of a specific job bid
 * @param   {string} jobId - The ID of the job whose bid status is being updated
 * @param   {Object} status - The status data to be updated
 * @returns {Object} The result of the update operation
 */

const updateBidStatus = async (jobId, status) => {
  const query = { _id: new ObjectId(jobId) };
  const updateDoc = { $set: status };
  const result = await jobBids.updateOne(query, updateDoc);
  return result;
};

export const JobBidService = {
  getJobBidsByUser,
  getJobBidsByJobOwner,
  saveJobBid,
  updateBidStatus,
};
