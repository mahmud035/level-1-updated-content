import httpStatus from 'http-status';

/**
 * Handle Zod validation errors
 *
 * @param {object} error - The ZodError object.
 * @returns {object} An object of formatted error messages with statusCode, message and errorMessages.
 */

const handleZodError = (error) => {
  const errors = error?.issues?.map((issue) => ({
    path: issue.path?.at(-1),
    message: issue.message,
  }));

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
