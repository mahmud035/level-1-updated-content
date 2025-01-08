import express from 'express';
import { JobRoutes } from '../modules/job/job.route.js';

const router = express.Router();

router.use('/jobs', JobRoutes);

// router.use('/job-bids');

// router.use('/auth');

export default router;
