import express from 'express';
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

export const JobRoutes = router;
