import { schedules } from '../../../server.js';

const getSchedules = async () => {
  const query = {};
  const result = await schedules.find(query).toArray();
  return result;
};

const getSchedule = async (id) => {};

const createSchedule = async (scheduleData) => {};

const updateSchedule = async (id, updatedData) => {};

const deleteSchedule = async (id) => {};

export const ScheduleService = {
  getSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
