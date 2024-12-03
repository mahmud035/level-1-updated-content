import { ObjectId } from 'mongodb';
import { coffees } from '../../../server.js';

const getCoffees = async (limit) => {
  const query = {};
  const result = await coffees.find(query).limit(limit).toArray();
  return result;
};

const getCoffee = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await coffees.findOne(query);
  return result;
};

const createCoffee = async (coffee) => {
  const result = await coffees.insertOne(coffee);
  return result;
};

const updateCoffee = async (id, updatedData) => {
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await coffees.updateOne(
    filter,
    { $set: updatedData },
    options
  );
  return result;
};

const deleteCoffee = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await coffees.deleteOne(query);
  return result;
};

export const CoffeeService = {
  getCoffees,
  getCoffee,
  createCoffee,
  updateCoffee,
  deleteCoffee,
};
