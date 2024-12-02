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
const products = database.collection('products');

//* GET(READ)
app.get('/products', async (req, res) => {
  const query = {};
  const result = await products.find(query).toArray();
  res.send(result);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await products.findOne(query);
  res.send(result);
});

//* POST(CREATE)
app.post('/products', async (req, res) => {
  const product = req.body;
  const result = await products.insertOne(product);
  res.send(result);
});

//* PUT/PATCH(UPDATE)
app.put('/products/:id', async (req, res) => {
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
});

//* DELETE
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await products.deleteOne(query);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
