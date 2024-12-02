/* eslint-disable no-undef */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { dbConnect, getDatabase } from './db.js';
import productsRoutes from './routes/products.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//* Middleware
app.use(cors());
app.use(express.json());

//* Initialize MongoDB
await dbConnect();

//* MongoDB Collections
export const products = getDatabase().collection('products');

//* Routes
app.use('/products', productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
