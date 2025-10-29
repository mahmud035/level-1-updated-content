import httpStatus from 'http-status';
import config from '../../config/index.js';
import { jwtHelper } from '../../helpers/jwtHelpers.js';
import sendResponse from '../../shared/sendResponse.js';

const auth = (req, res, next) => {
  try {
    //* Step 1: Get accessToken
    const token = req.cookies?.accessToken;

    if (!token)
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You are not authorized',
      });

    //* Step 2: Verify token
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.access_token_secret
    );

    // TODO: Step 3: Implement role based authentication here

    //* Step 4: Set verifiedUser into req object
    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
