import { ObjectId } from 'mongodb';
import { users } from '../index.js';

// @desc    Get all users
// @route   GET /users
export const getUsers = async (req, res) => {
  const query = {};
  const result = await users.find(query).toArray();
  res.send(result);
};

// @desc    Get single user
// @route   GET /users/:id
export const getUser = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await users.findOne(query);
  res.send(result);
};

// @desc    Create new user
// @route   POST /users
export const createUser = async (req, res) => {
  const user = req.body;
  const result = await users.insertOne(user);
  res.send(result);
};

// @desc    Update a user
// @route   PUT /users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await users.updateOne(filter, { $set: updatedUser }, options);
  res.send(result);
};

// @desc    Delete a user
// @route   DELETE /users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: new ObjectId(id) };
  const result = await users.deleteOne(filter);
  res.send(result);
};
