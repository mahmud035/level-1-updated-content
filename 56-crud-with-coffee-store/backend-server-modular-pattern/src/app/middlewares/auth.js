import httpStatus from 'http-status';
import config from '../../config/index.js';
import { jwtHelper } from '../../helpers/jwtHelper.js';
import sendResponse from '../../shared/sendResponse.js';

const auth = (req, res, next) => {
  try {
    //* Step 1: Get accessToken
    const token = req.cookies?.accessToken;

    if (!token)
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Yor are not authorized',
      });

    //* Step 2: Verify token
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.access_token_secret
    );

    //* Step 3: Implement role based authentication here

    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError')
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Token expired, please login again',
      });

    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Invalid token',
    });
  }
};

export default auth;
