import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME;

let database;

export const dbConnect = async () => {
  try {
    await client.connect();
    database = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export const getDatabase = () => {
  if (!database)
    return console.log('Database not initialized. Call dbConnect() first.');
  return database;
};
