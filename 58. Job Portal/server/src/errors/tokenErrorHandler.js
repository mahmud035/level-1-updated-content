import httpStatus from 'http-status';
import sendResponse from '../shared/sendResponse.js';

const handleJwtErrors = (error, res, type) => {
  const tokenType = type === 'access' ? 'access token' : 'refresh token';

  if (error.name === 'TokenExpiredError') {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      message: `${
        tokenType.at(0).toUpperCase() + tokenType.slice(1)
      } expired, please login again`,
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      message: `Invalid ${tokenType}`,
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: `An unexpected error occurred while processing ${tokenType}. Please try again later.`,
  });
};

export default handleJwtErrors;
