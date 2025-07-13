import express from 'express';
import auth from '../../middlewares/auth.js';
import { JobApplicationController } from './jobApplication.controller.js';

// IMPORTANT: Request Flow: auth => validateRequest() => controller
// Verify token and authenticate the user first => Then Validate the request payload => And Then Proceed to the controller logic.

const router = express.Router();

// Get specific user's job applications
router.get('/', auth, JobApplicationController.getJobApplications);

// Get the number of applications for a specific job
router.get(
  '/:id/applications/count',
  auth,
  JobApplicationController.getJobApplicationCount
);

// Save job application
router.post('/', auth, JobApplicationController.saveJobApplication);

// Delete job application
router.delete('/:id', auth, JobApplicationController.deleteJobApplication);

export const JobApplicationRoutes = router;
