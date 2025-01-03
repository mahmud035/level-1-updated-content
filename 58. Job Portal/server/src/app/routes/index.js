import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { JobRoutes } from '../modules/job/job.route.js';
import { JobApplicationRoutes } from '../modules/jobApplication/jobApplication.route.js';

const router = express.Router();

router.use('/jobs', JobRoutes);
router.use('/job-applications', JobApplicationRoutes);
router.use('/auth', AuthRoutes);

export default router;
