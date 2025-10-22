import httpStatus from 'http-status';

/**
 * Handles Jwt token errors
 *
 * @param {object} error - The token error object.
 * @returns {object} An object of formatted error messages with statusCode and message.
 */

const handleJwtError = (error) => {
  const statusCode = httpStatus.UNAUTHORIZED;
  let message;

  if (error.name === 'TokenExpiredError') {
    message = `Token expired. Please login again`;
  }

  if (error.name === 'JsonWebTokenError') {
    message = `Invalid token`;
  }

  return { statusCode, message };
};

export default handleJwtError;
