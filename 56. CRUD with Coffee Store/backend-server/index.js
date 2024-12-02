import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { dbConnect, getDatabase } from './db.js';
import coffeesRoutes from './routes/coffees.route.js';
import usersRoutes from './routes/users.route.js';

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
export const coffees = getDatabase().collection('coffees');
export const users = getDatabase().collection('users');

//* Routes
app.use('/coffees', coffeesRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// TODO: Export the app for serverless deployment (vercel)
export default app;
