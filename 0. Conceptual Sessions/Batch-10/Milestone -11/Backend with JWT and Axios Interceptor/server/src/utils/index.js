export const corsOptions = {
  origin: [
    'http://localhost:5173', // Local Development
    'http://localhost:5174', // Local Development
    'http://frontend.com', // Production frontend
  ],
  credentials: true, // Allow cookies to be sent
};

/**
 * NOTE: Why Do I Need to Include the Production Frontend URL?
 
 * 1. To Allow Requests from Your Frontend

 ** 2. To Allow Cookies and Authentication
      ** If your application uses cookies (e.g., JWT stored as a cookie), you need to set `credentials: true` in both your CORS configuration and your frontend HTTP client (e.g., Axios).
     
      ** Cookies will only be sent if the backend explicitly allows the requesting origin in the CORS configuration.
 
 * 3. To Prevent Unauthorized Origins
 */
