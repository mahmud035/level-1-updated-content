import express from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { JobController } from './job.controller.js';
import { JobValidation } from './job.validation.js';

// IMPORTANT: Request Flow: auth => validateRequest() => controller
// 👉 Ensure that the user is authenticated first, validate the request payload, and then proceed to the controller logic.

const router = express.Router();

// Get all jobs with pagination, sorting, searching, and filtering
router.get(
  '/',
  validateRequest(JobValidation.getJobsZodSchema),
  JobController.getJobs
);

// Get all jobs posted by a specific user
router.get(
  '/user',
  auth,
  validateRequest(JobValidation.getJobsByUserZodSchema),
  JobController.getJobsByUser
);

// Get a single job by its ID
router.get(
  '/:jobId',
  validateRequest(JobValidation.getJobZodSchema),
  JobController.getJob
);

// Create a new job posting
router.post(
  '/',
  auth,
  validateRequest(JobValidation.createJobZodValidation),
  JobController.createJob
);

// Update an existing job by its ID
router.patch(
  '/:jobId',
  auth,
  validateRequest(JobValidation.updateJobZodValidation),
  JobController.updateJob
);

// Delete a job by its ID
router.delete(
  '/:jobId',
  auth,
  validateRequest(JobValidation.deleteJobZodSchema),
  JobController.deleteJob
);

export const JobRoutes = router;
