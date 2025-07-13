import { ObjectId } from 'mongodb';
import { coffees } from '../index.js';

// @desc    Get all coffees
// @route   GET /coffees
export const getCoffees = async (req, res) => {
  const query = {};
  const result = await coffees.find(query).toArray();
  res.send(result);
};

// @desc    Get single coffee
// @route   GET /coffees/:id
export const getCoffee = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await coffees.findOne(query);
  res.send(result);
};

// @desc    Create new coffee
// @route   POST /coffees
export const createCoffee = async (req, res) => {
  const coffee = req.body;
  const result = await coffees.insertOne(coffee);
  res.send(result);
};

// @desc    Update a coffee
// @route   PUT /coffees/:id
export const updateCoffee = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { _id, ...updatedCoffee } = data; // 👉 separate _id property from coffee data.
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await coffees.updateOne(
    filter,
    { $set: updatedCoffee },
    options
  );
  res.send(result);
};

// @desc    Delete a coffee
// @route   DELETE /coffees/:id
export const deleteCoffee = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await coffees.deleteOne(query);
  res.send(result);
};
