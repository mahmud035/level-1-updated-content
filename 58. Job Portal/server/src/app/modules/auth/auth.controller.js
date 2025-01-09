import httpStatus from 'http-status';
import config from '../../../config/index.js';
import { jwtHelper } from '../../../helpers/jwtHelpers.js';
import sendResponse from '../../../shared/sendResponse.js';
import { AuthService } from './auth.services.js';
import { cookieOptions } from './auth.utils.js';

// @desc    Login (Generate Tokens)
// @route   POST /auth/login
const loginUser = async (req, res, next) => {
  try {
    const { ...loginData } = req.body;
    const { accessToken, refreshToken } = await AuthService.loginUser(
      loginData
    );

    //* Set accessToken & refreshToken into res.cookie()
    // Format: res.cookie('name', value, cookieOptions)
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh token (refresh access token)
// @route   POST /auth/refresh-token
const refreshAccessToken = async (req, res, next) => {
  try {
    //* Step 1: Get refreshToken
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken)
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        message: 'Refresh token not provided',
      });

    //* Step 2: Verify token
    const verifiedUser = jwtHelper.verifyToken(
      refreshToken,
      config.jwt.refresh_token_secret
    );

    //* Step 3: Generate NEW accessToken & refreshToken
    const { newAccessToken, newRefreshToken } =
      await AuthService.refreshAccessToken(verifiedUser);

    //* Step 4: Set NEW accessToken and refreshToken into res.cookie()
    res.cookie('accessToken', newAccessToken, cookieOptions);
    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Generate NEW accessToken & refreshToken successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout (Clear Tokens)
// @route   POST /auth/logout
const logoutUser = async (req, res, next) => {
  try {
    //* Delete accessToken & refreshToken from res.cookie()
    res.clearCookie('accessToken', { ...cookieOptions, maxAge: 0 });
    res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logout successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  loginUser,
  refreshAccessToken,
  logoutUser,
};
