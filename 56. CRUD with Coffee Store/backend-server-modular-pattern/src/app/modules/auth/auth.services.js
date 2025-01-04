import config from '../../../config/index.js';
import { jwtHelper } from '../../../helpers/jwtHelper.js';

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

export const AuthService = { loginUser };
