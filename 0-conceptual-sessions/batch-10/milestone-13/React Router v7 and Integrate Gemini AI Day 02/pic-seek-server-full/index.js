import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/utils/connectDB.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚩 Server is Running at Port ⚡ ${port}`);
      console.log(`🚀 Connected to MongoDB Compass`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
