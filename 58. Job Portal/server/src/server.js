import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import errorHandler from './app/middlewares/errorHandler.js';
import notFound from './app/middlewares/notFound.js';
import ApplicationRoutes from './app/routes/index.js';
import config from './config/index.js';
import { dbConnect, getDatabase } from './db.js';
import { corsOptions } from './utils/index.js';

const app = express();
const PORT = config.port || 5000;

//* Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

//* Initialized MongoDB
await dbConnect();

//* MongoDB Collections
export const jobs = getDatabase().collection('jobs');
export const jobApplications = getDatabase().collection('jobApplications');

// For Optimizing Queries
await jobs.createIndex({ title: 'text', location: 'text' });
await jobApplications.createIndex({ 'applicantInfo.email': 1 });

//* Application Routes
app.use('/api/v1', ApplicationRoutes);

app.get('/', (req, res) => {
  res.send('Job Portal API');
});

//* Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// TODO: Export the app for serverless deployment (vercel)
export default app;
