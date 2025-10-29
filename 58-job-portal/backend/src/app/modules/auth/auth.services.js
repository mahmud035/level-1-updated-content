import config from '../../../config/index.js';
import { jwtHelper } from '../../../helpers/jwtHelpers.js';

const loginUser = async (payload) => {
  const accessToken = jwtHelper.createToken(
    payload,
    config.jwt.access_token_secret,
    config.jwt.access_token_expires_in
  );

  const refreshToken = jwtHelper.createToken(
    payload,
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in
  );

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (payload) => {
  // Remove 'exp' from the payload to avoid conflict
  const { iat, exp, ...newPayload } = payload;

  const newAccessToken = jwtHelper.createToken(
    newPayload,
    config.jwt.access_token_secret,
    config.jwt.access_token_expires_in
  );

  const newRefreshToken = jwtHelper.createToken(
    newPayload,
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in
  );

  return { newAccessToken, newRefreshToken };
};

export const AuthService = {
  loginUser,
  refreshAccessToken,
};
