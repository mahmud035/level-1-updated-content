import jwt from 'jsonwebtoken';

const createToken = (payload, secret, expiresTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresTime,
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
