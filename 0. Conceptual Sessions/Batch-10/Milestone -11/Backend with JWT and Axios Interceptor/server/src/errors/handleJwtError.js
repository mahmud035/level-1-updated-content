import httpStatus from 'http-status';

/**
 * Handles Jwt token errors
 *
 * @param {object} error - The token error object.
 * @param {string} type - Token type - value would be: access | refresh
 * @returns {object} An object of formatted error messages with statusCode and message.
 */

const handleJwtError = (error, type) => {
  const tokenType = type === 'access' ? 'access token' : 'refresh token';

  const statusCode = httpStatus.UNAUTHORIZED;
  let message;

  if (error.name === 'TokenExpiredError') {
    message = `${
      tokenType.at(0).toUpperCase() + tokenType.slice(1)
    } expired. Please login again`;
  }

  if (error.name === 'JsonWebTokenError') {
    message = `Invalid ${tokenType}`;
  }

  return {
    statusCode,
    message,
  };
};

export default handleJwtError;
