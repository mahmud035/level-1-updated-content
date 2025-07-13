import express from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { JobController } from './job.controller.js';
import { JobValidation } from './job.validation.js';

// IMPORTANT: Request Flow: auth => validateRequest() => controller
// Verify token and authenticate the user first => Then Validate the request payload => And Then Proceed to the controller logic.

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
  auth,
  validateRequest(JobValidation.createJobZodSchema),
  JobController.createJob
);

// Update a job
router.patch(
  '/:id',
  auth,
  validateRequest(JobValidation.updateJobZodSchema),
  JobController.updateJob
);

// Delete a job
router.delete('/:id', auth, JobController.deleteJob);

export const JobRoutes = router;
