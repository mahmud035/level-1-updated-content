import { MongoClient } from 'mongodb';
import config from './config/index.js';

//* MongoDB Connection
const uri = config.database_uri;
const client = new MongoClient(uri);
const dbName = config.database_name;

let database;

export const dbConnect = async () => {
  try {
    await client.connect(); // 👈 For production, comment out this line
    database = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exists process if connection fails
  }
};

export const getDatabase = () => {
  if (!database)
    throw new Error('Database not initialized. Call dbConnect() first');
  return database;
};
