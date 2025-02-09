import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const client = new MongoClient(process.env.DATABASE_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db('my-ai-server-db');
export const imageCollection = db.collection('images');
export const commentCollection = db.collection('comments');

export default async function connectDB() {
  return client.connect();
}
