import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { JobBidService } from './jobBid.services.js';

/**
 * @desc    Get all job bids placed by a specific user
 * @route   GET /job-bids/user?userEmail=
 * @param   {Object} req - The request object containing the userEmail query parameter
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with all the bids placed by the user
 */

const getJobBidsByUser = async (req, res, next) => {
  try {
    const { userEmail } = req.query;
    const jobBids = await JobBidService.getJobBidsByUser(userEmail);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully retrieved all bids placed by the user.',
      data: jobBids,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bid requests for a job owner
 * @route   GET /job-bids/for-owner?ownerEmail=
 * @param   {Object} req - The request object containing the ownerEmail query parameter
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with all job bids placed for the job owner
 */

const getAllJobBidsForOwner = async (req, res, next) => {
  try {
    const { ownerEmail } = req.query;
    const allJobBids = await JobBidService.getAllJobBidsForOwner(ownerEmail);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully retrieved all bids for the job owner.',
      data: allJobBids,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bids for a specific job posted by the job owner
 * @route   GET /job-bids/:jobId/for-owner?ownerEmail=
 * @param   {Object} req - The request object containing the jobId parameter and ownerEmail query parameter
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response with all the bids for the specified job
 */

const getJobBidsByJobOwner = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { ownerEmail } = req.query;
    const jobBids = await JobBidService.getJobBidsByJobOwner(jobId, ownerEmail);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully retrieved all bids for the specified job.',
      data: jobBids,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Save a new bid for a job
 * @route   POST /job-bids
 * @param   {Object} req - The request object containing the bid data
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response confirming the bid placement
 */

const saveJobBid = async (req, res, next) => {
  try {
    const { ...bidData } = req.body;

    // Prevent the job owner from bidding on their own job
    if (bidData?.bidderEmail === bidData?.jobOwnerEmail)
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        message: 'Job owner cannot place a bid on their own job.',
      });

    const result = await JobBidService.saveJobBid(bidData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: `Successfully placed a bid for '${bidData.jobTitle}'.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update the status of a specific job bid
 * @route   PATCH /job-bids/bid/:jobBidId
 * @param   {Object} req - The request object containing the bid data
 * @param   {Object} res - The response object to send back the result
 * @param   {Function} next - The next middleware function for error handling
 * @returns {Object} JSON response confirming the bid status update
 */

const updateBidStatus = async (req, res, next) => {
  try {
    const { jobBidId } = req.params;
    const { jobId, ...status } = req.body;

    const result = await JobBidService.updateBidStatus(jobBidId, jobId, status);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bid status successfully updated',
    });
  } catch (error) {
    next(error);
  }
};

export const JobBidController = {
  getJobBidsByUser,
  getAllJobBidsForOwner,
  getJobBidsByJobOwner,
  saveJobBid,
  updateBidStatus,
};
