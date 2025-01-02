import express from 'express';
import { JobController } from './job.controller.js';

const router = express.Router();

// Get jobs with pagination, searching, and filtering
router.get('/', JobController.getJobs);

// Search jobs
// router.get('/search', JobController.searchJobs);

// Filter jobs
// router.get('/filter', JobController.filterJobs);

// Get single job
router.get('/:id', JobController.getJob);

// Create new job
router.post('/', JobController.createJob);

// Update a job
router.patch('/:id', JobController.updateJob);

// Delete a job
router.delete('/:id', JobController.deleteJob);

export const JobRoutes = router;
