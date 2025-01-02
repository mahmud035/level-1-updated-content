import express from 'express';
import { JobRoutes } from '../modules/job/job.route.js';
import { JobApplicationRoutes } from '../modules/jobApplication/jobApplication.route.js';

const router = express.Router();

router.use('/jobs', JobRoutes);
router.use('/job-applications', JobApplicationRoutes);

export default router;
