import config from '../../../config/index.js';

export const cookieOptions = {
  httpOnly: true, // Protects the cookie from client-side scripts
  secure: config.env === 'production', // Ensures cookie is sent over HTTPS in production
  sameSite: config.env === 'production' ? 'None' : 'Strict', // Cross-site in production
  // maxAge: 60 * 60 * 1000, // 60 minutes expiration
};
