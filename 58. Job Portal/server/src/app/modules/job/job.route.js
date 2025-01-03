import express from 'express';
import auth from '../../middlewares/auth.js';
import { JobController } from './job.controller.js';

const router = express.Router();

// Get jobs with pagination, searching, and filtering
router.get('/', JobController.getJobs);

// Get recruiter posted jobs
router.get('/recruiter-jobs', auth, JobController.getRecruiterJobs);

// Search jobs
// router.get('/search', JobController.searchJobs);

// Filter jobs
// router.get('/filter', JobController.filterJobs);

// Get single job
router.get('/:id', JobController.getJob);

// Create new job
router.post('/', auth, JobController.createJob);

// Update a job
router.patch('/:id', auth, JobController.updateJob);

// Delete a job
router.delete('/:id', auth, JobController.deleteJob);

export const JobRoutes = router;
