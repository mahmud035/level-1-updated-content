import express from 'express';
import { JobApplicationController } from './jobApplication.controller.js';

const router = express.Router();

// Get specific user's job applications
router.get('/', JobApplicationController.getJobApplications);

// Get the number of applications for a specific job
router.get(
  '/:id/applications/count',
  JobApplicationController.getJobApplicationCount
);

// Save job application
router.post('/', JobApplicationController.saveJobApplication);

// Delete job application
router.delete('/:id', JobApplicationController.deleteJobApplication);

export const JobApplicationRoutes = router;
