import { ObjectId } from 'mongodb';
import { products } from '../../../server.js';

const getProducts = async (limit) => {
  const query = {};
  const result = await products.find(query).limit(limit).toArray();
  return result;
};

const getProduct = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await products.findOne(query);
  return result;
};

const createProduct = async (product) => {
  const result = await products.insertOne(product);
  return result;
};

const updateProduct = async (id, updatedData) => {
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await products.updateOne(
    filter,
    { $set: updatedData },
    options
  );
  return result;
};

const deleteProduct = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await products.deleteOne(query);
  return result;
};

export const ProductService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
