import express from 'express';
import { ScheduleController } from './schedule.controller.js';

const router = express.Router();

// Get all schedules
router.get('/', ScheduleController.getSchedules);

// Get single schedule
router.get('/:id', ScheduleController.getSchedule);

// Create new schedule
router.post('/', ScheduleController.createSchedule);

// Update a schedule
router.put('/:id', ScheduleController.updateSchedule);

// Delete a schedule
router.delete('/:id', ScheduleController.deleteSchedule);

export const ScheduleRoutes = router;
