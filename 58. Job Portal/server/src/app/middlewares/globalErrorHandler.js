import { MongoServerError } from 'mongodb';
import { ZodError } from 'zod';
import config from '../../config/index.js';
import handleJwtError from '../../errors/handleJwtError.js';
import handleMongoDBError from '../../errors/handleMongoDBError.js';
import handleZodError from '../../errors/handleZodError.js';

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (
    error.name === 'TokenExpiredError' ||
    error.name === 'JsonWebTokenError'
  ) {
    const simplifiedError = handleJwtError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (error instanceof MongoServerError) {
    const simplifiedError = handleMongoDBError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
