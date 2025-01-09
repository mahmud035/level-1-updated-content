import express from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { JobBidController } from './jobBid.controller.js';
import { JobBidValidation } from './jobBid.validation.js';

// IMPORTANT: Request Flow: auth => validateRequest() => controller
// Ensure that the user is authenticated first, validate the request payload, and then proceed to the controller logic.

const router = express.Router();

// Get all job bids placed by a specific user
router.get(
  '/user',
  auth,
  validateRequest(JobBidValidation.getJobBidsByUserZodSchema),
  JobBidController.getJobBidsByUser
);

// Get all bids for a specific job posted by the job owner
router.get(
  '/:jobId/for-owner',
  auth,
  validateRequest(JobBidValidation.getJobBidsByJobOwnerZodSchema),
  JobBidController.getJobBidsByJobOwner
);

// Save a new bid for a job
router.post(
  '/',
  auth,
  validateRequest(JobBidValidation.saveJobBidZodSchema),
  JobBidController.saveJobBid
);

export const JobBidRoutes = router;
