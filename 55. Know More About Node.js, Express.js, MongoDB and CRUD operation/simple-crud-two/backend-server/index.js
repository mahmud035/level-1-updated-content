/* eslint-disable no-undef */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

//* Middleware
app.use(cors());
app.use(express.json());

//* MongoDB Connection
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME;
let database;

const dbConnect = () => {
  try {
    database = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
  }
};
dbConnect();

//* Collections
const users = database.collection('users');

//* GET(READ)
app.get('/users', async (req, res) => {
  const query = {};
  const result = await users.find(query).toArray();
  res.send(result);
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await users.findOne(query);
  res.send(result);
});

//* POST(CREATE)
app.post('/users', async (req, res) => {
  const user = req.body;
  const result = await users.insertOne(user);
  res.send(result);
});

//* PUT/PATCH(UPDATE)
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const result = await users.updateOne(filter, { $set: updatedUser }, options);
  res.send(result);
});

//* DELETE
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await users.deleteOne(query);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
