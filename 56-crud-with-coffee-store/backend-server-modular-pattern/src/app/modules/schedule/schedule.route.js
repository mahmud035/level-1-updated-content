import express from 'express';
import { ScheduleController } from './schedule.controller.js';
import { ScheduleValidation } from './schedule.validation.js';

const router = express.Router();

// Get all schedules
router.get('/', ScheduleController.getSchedules);

// Search schedule
router.get('/search', ScheduleController.searchSchedules);

// Get single schedule
router.get(
  '/:id',
  ScheduleValidation.getScheduleValidation,
  ScheduleController.getSchedule
);

// Create new schedule
router.post(
  '/',
  ScheduleValidation.createScheduleValidation,
  ScheduleController.createSchedule
);

// Update a schedule
router.put(
  '/:id',
  ScheduleValidation.updateScheduleValidation,
  ScheduleController.updateSchedule
);

// Delete a schedule
router.delete(
  '/:id',
  ScheduleValidation.deleteScheduleValidation,
  ScheduleController.deleteSchedule
);

export const ScheduleRoutes = router;
