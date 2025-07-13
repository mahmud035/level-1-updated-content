import { ObjectId } from 'mongodb';
import { products } from '../index.js';

// @desc    Get all products
// @route   GET /products
export const getProducts = async (req, res) => {
  const query = {};
  const result = await products.find(query).toArray();
  res.send(result);
};

// @desc    Get single product
// @route   GET /products/:id
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await products.findOne(query);
  res.send(result);
};

// @desc    Create new product
// @route   POST /products
export const createProduct = async (req, res) => {
  const product = req.body;
  const result = await products.insertOne(product);
  res.send(result);
};

// @desc    Update a product
// @route   PUT /products/:id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await products.updateOne(
    filter,
    { $set: updatedProduct },
    options
  );
  res.send(result);
};

// @desc    Delete a product
// @route   DELETE /products/:id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await products.deleteOne(query);
  res.send(result);
};
