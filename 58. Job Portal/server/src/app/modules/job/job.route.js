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

// Get recruiter posted jobs
router.get('/recruiter-jobs', auth, JobController.getRecruiterJobs);

// Search jobs
// router.get('/search', JobController.searchJobs);

// Filter jobs
// router.get('/filter', JobController.filterJobs);

// Get single job
router.get('/:id', JobController.getJob);

// Create a new job
router.post(
  '/',
  auth, // Verify token and authenticate the user first
  validateRequest(JobValidation.createJobZodSchema), // Validate the request payload
  JobController.createJob // Proceed to the controller logic
);

// Update a job
router.patch(
  '/:id',
  auth, // Verify token and authenticate the user first
  validateRequest(JobValidation.updateJobZodSchema), // Validate the request payload
  JobController.updateJob // Proceed to the controller logic
);

// Delete a job
router.delete('/:id', auth, JobController.deleteJob);

export const JobRoutes = router;
