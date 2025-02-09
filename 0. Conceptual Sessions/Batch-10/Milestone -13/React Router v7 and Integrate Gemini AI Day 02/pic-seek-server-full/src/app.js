import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from './middleware/logger.js';
import ApplicationRoutes from './routes/index.js';

dotenv.config();
const app = express();

//* Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

//* Routes
app.use('/api/v1', ApplicationRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: `🚩 Server is Running`,
  });
});

export default app;
