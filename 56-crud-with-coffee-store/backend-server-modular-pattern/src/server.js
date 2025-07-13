import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './app/middlewares/errorHandler.js';
import { notFound } from './app/middlewares/notFound.js';
import ApplicationRoutes from './app/routes/index.js';
import config from './config/index.js';
import { dbConnect, getDatabase } from './db.js';
import { corsOptions } from './utils/index.js';

const app = express();
const PORT = config.port || 5000;

//* Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
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

// TODO: Export the app for serverless deployment (vercel)
export default app;
