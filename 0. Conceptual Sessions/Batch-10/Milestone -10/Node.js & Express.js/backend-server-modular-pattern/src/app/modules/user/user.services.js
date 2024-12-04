import { ObjectId } from 'mongodb';
import { users } from '../../../server.js';

const getUsers = async (filter) => {
  const { limit, skip } = filter;
  const query = {};
  const result = await users.find(query).limit(limit).skip(skip).toArray();
  return result;
};

const searchUsers = async (filter) => {
  const result = await users.find(filter).toArray();
  return result;
};

const getUser = async (id) => {
  const query = { _id: new ObjectId(id) };
  const user = await users.findOne(query);
  return user;
};

const createUser = async (user) => {
  const result = await users.insertOne(user);
  return result;
};

const updateUser = async (id, updatedData) => {
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await users.updateOne(filter, { $set: updatedData }, options);
  return result;
};

const deleteUser = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await users.deleteOne(query);
  return result;
};

export const UserService = {
  getUsers,
  searchUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
