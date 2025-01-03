import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  database_name: process.env.DATABASE_NAME,
  jwt: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
};

/**
  * NOTE: Why Use path.join(process.cwd(), '.env')?
    Flexibility: Ensures that the .env file is correctly located regardless of where the script is executed.
    Platform Independence: Handles file paths in a way that works across different operating systems (Linux/Mac/Windows).
    Customization: Allows you to specify a custom .env file if needed (e.g., .env.production).
 */
