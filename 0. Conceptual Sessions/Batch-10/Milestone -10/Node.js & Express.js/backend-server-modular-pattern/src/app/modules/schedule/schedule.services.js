import { ObjectId } from 'mongodb';
import { schedules } from '../../../server.js';

const getSchedules = async (filter) => {
  const { limit, skip } = filter;
  const query = {};
  const result = await schedules.find(query).limit(limit).skip(skip).toArray();
  return result;
};

const searchSchedule = async (filter) => {
  const result = await schedules.find(filter).toArray();
  return result;
};

const getSchedule = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await schedules.findOne(query);
  return result;
};

const createSchedule = async (schedule) => {
  const result = await schedules.insertOne(schedule);
  return result;
};

const updateSchedule = async (id, updatedData) => {
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await schedules.updateOne(
    filter,
    { $set: updatedData },
    options
  );
  return result;
};

const deleteSchedule = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await schedules.deleteOne(query);
  return result;
};

export const ScheduleService = {
  getSchedules,
  searchSchedule,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
