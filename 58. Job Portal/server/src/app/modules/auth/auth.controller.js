import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { AuthService } from './auth.services.js';
import { cookieOptions } from './auth.utils.js';

// @desc    Login (Generate Tokens)
// @route   POST /auth/login
export const loginUser = async (req, res, next) => {
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

// @desc    Logout (Clear Tokens)
// @route   POST /auth/logout
const logoutUser = async (req, res, next) => {
  try {
    //* Delete accessToken & refreshToken from cookie
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

export const AuthController = { loginUser, logoutUser };
