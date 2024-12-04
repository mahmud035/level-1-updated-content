import { ObjectId } from 'mongodb';
import { posts } from '../../../server.js';

const getPosts = async (filter) => {
  const { limit, skip } = filter;
  const query = {};
  const result = await posts.find(query).limit(limit).skip(skip).toArray();
  return result;
};

const getPost = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await posts.findOne(query);
  return result;
};

const createPost = async (post) => {
  const result = await posts.insertOne(post);
  return result;
};

const updatePost = async (id, updatedData) => {
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await posts.updateOne(filter, { $set: updatedData }, options);
  return result;
};

const deletePost = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await posts.deleteOne(query);
  return result;
};

export const PostService = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
