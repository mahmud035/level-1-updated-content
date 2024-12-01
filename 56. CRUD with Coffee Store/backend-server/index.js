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
const coffees = database.collection('coffees');
const users = database.collection('users');

//* GET(READ)
app.get('/coffees', async (req, res) => {
  const query = {};
  const result = await coffees.find(query).toArray();
  res.send(result);
});

app.get('/coffees/:id', async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await coffees.findOne(query);
  res.send(result);
});

//* POST(CREATE)
app.post('/coffees', async (req, res) => {
  const coffee = req.body;
  const result = await coffees.insertOne(coffee);
  res.send(result);
});

app.post('/users', async (req, res) => {
  const user = req.body;
  const result = await users.insertOne(user);
  res.send(result);
});

//* PUT/PATCH(UPDATE)
app.put('/coffees/:id', async (req, res) => {
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
});

//* DELETE
app.delete('/coffees/:id', async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await coffees.deleteOne(query);
  res.send(result);
});

app.get('/', (req, res) => {
  res.send(`Coffee Store server is running`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
