import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { JobApplicationServices } from './jobApplication.services.js';

// @desc    Get specific user's job applications
// @route   GET /job-applications?email=
const getJobApplications = async (req, res, next) => {
  try {
    const applicantEmail = req.query.email;
    const jobApplications = await JobApplicationServices.getJobApplications(
      applicantEmail
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job application fetched successfully',
      data: jobApplications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save job application
// @route   POST /job-applications
const saveJobApplication = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await JobApplicationServices.saveJobApplication(data);

    if (!result.insertedId)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Something went wrong',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job application saved successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job application
// @route   DELETE /job-applications/:id
const deleteJobApplication = async (req, res, next) => {
  try {
    const id = req.params.id;
    const applicantEmail = req.query.email;
    const result = await JobApplicationServices.deleteJobApplication(
      id,
      applicantEmail
    );

    if (result.deletedCount === 0)
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Job application not found',
      });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job application deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const JobApplicationController = {
  getJobApplications,
  saveJobApplication,
  deleteJobApplication,
};
