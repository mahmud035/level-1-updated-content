import { ObjectId } from 'mongodb';
import { posts } from '../index.js';

// @desc   Get all posts
// @route  GET /posts
export const getPosts = async (req, res) => {
  const query = {};
  const result = await posts.find(query).toArray();
  res.send(result);
};

// @desc   Get single post
// @route  GET /posts/:id
export const getPost = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await posts.findOne(query);
  res.send(result);
};

// @desc   Create new post
// @route  POST /posts
export const createPost = async (req, res) => {
  const post = req.body;
  const result = await posts.insertOne(post);
  res.send(result);
};

// @desc   Update a post
// @route  PUT /posts/:id
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await posts.updateOne(filter, { $set: updatedPost }, options);
  res.send(result);
};

// @desc   Delete a post
// @route  DELETE /posts/:id
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await posts.deleteOne(query);
  res.send(result);
};
