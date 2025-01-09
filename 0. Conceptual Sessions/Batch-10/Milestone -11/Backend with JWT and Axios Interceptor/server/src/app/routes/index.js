import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { JobRoutes } from '../modules/job/job.route.js';

const router = express.Router();

router.use('/jobs', JobRoutes);

// router.use('/job-bids');

router.use('/auth', AuthRoutes);

export default router;
