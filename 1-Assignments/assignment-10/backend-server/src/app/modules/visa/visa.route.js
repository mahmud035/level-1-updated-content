import express from 'express';
import { VisaController } from './visa.controller.js';

const router = express.Router();

router.get('/', VisaController.getVisas);

export const VisaRoutes = router;
