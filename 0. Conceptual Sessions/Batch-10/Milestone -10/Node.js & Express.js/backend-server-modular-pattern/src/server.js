import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './app/middlewares/errorHandler.js';
import { notFound } from './app/middlewares/notFound.js';
import ApplicationRoutes from './app/routes/index.js';
import { dbConnect, getDatabase } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//* Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//* Initialize MongoDB
await dbConnect();

//* MongoDB Collections
export const users = getDatabase().collection('users');
export const products = getDatabase().collection('products');
export const coffees = getDatabase().collection('coffees');
export const posts = getDatabase().collection('posts');
export const schedules = getDatabase().collection('schedules');

//* Application Routes
app.use('/api/v1', ApplicationRoutes);

//* Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
