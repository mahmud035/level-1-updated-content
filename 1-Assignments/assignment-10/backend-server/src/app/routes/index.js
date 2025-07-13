import express from 'express';
import { VisaRoutes } from '../modules/visa/visa.route.js';

const router = express.Router();

router.use('/visas', VisaRoutes);

export default router;
