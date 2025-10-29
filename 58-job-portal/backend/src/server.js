import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import notFoundRoute from './app/middlewares/notFoundRoute.js';
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
await jobs.createIndex({ title: 1, location: 1 });
await jobApplications.createIndex({ 'applicantInfo.email': 1 });

//* Application Routes
app.use('/api/v1', ApplicationRoutes);

app.get('/', (req, res) => {
  res.send('Job Portal API');
});

//* Global Error Handler
app.use(globalErrorHandler);

//* Handle Not Found Route
app.use(notFoundRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// TODO: Export the app for serverless deployment (vercel)
export default app;
