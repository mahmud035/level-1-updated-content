import config from '../../../config/index.js';
import { jwtHelper } from '../../../helpers/jwtHelper.js';
import { users } from '../../../server.js';

const registerUser = async (data) => {
  // Check if user already exist in db
  const query = { email: data.email };
  const alreadyExists = await users.findOne(query);
  if (alreadyExists) throw new Error('User already exists');

  const result = await users.insertOne(data);
  return result;
};

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
  const { exp, iat, ...newPayload } = payload;

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
  registerUser,
  loginUser,
  refreshAccessToken,
};
