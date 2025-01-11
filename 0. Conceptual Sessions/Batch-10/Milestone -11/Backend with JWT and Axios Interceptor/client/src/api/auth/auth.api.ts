import axiosInstance from '../../config/axios.config';
import { ILoginData, IUser } from '../../types/auth';

// Register (Save new user into db)
export const registerUser = async (user: IUser) => {
  const { data } = await axiosInstance.post(`/auth/register`, user);
  return data;
};

// Login (Generate Tokens)
export const generateTokens = async (loginData: ILoginData) => {
  const { data } = await axiosInstance.post(`/auth/login`, loginData);
  return data;
};

// Refresh token (refresh access token)
export const refreshAccessToken = async () => {
  const { data } = await axiosInstance.post(`/auth/refresh-token`);
  return data;
};

// Logout (Clear Tokens)
export const clearTokens = async () => {
  const { data } = await axiosInstance.post(`/auth/logout`);
  return data;
};
