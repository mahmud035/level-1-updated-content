import express from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { JobController } from './job.controller.js';
import { JobValidation } from './job.validation.js';

const router = express.Router();

// Get jobs with pagination, sorting, searching, and filtering
router.get(
  '/',
  validateRequest(JobValidation.getJobsZodSchema),
  JobController.getJobs
);

// Get a single job
router.get(
  '/:jobId',
  validateRequest(JobValidation.getJobZodSchema),
  JobController.getJob
);

// Create a new job
router.post(
  '/',
  auth, // Verify token and authenticate the user first
  validateRequest(JobValidation.createJobZodValidation), // Validate the request payload
  JobController.createJob // Proceed to the controller logic
);

// Update a job
router.patch(
  '/:jobId',
  auth, // Verify token and authenticate the user first
  validateRequest(JobValidation.updateJobZodValidation), // Validate the request payload
  JobController.updateJob // Proceed to the controller logic
);

// Delete a job
router.delete(
  '/:jobId',
  auth, // Verify token and authenticate the user first
  validateRequest(JobValidation.deleteJobZodSchema), // Validate the request payload
  JobController.deleteJob // Proceed to the controller logic
);

export const JobRoutes = router;
