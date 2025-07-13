import axiosInstance from '../../config/axios.config';
import { IUser } from '../../types/auth';

// NOTE: If I don't use firebase for authentication, then this function name should be "loginUser".

export const generateTokens = async (user: IUser) => {
  const { data } = await axiosInstance.post('/auth/login', user);
  return data;
};

export const refreshAccessToken = async () => {
  const { data } = await axiosInstance.post('/auth/refresh-token');
  return data;
};

export const clearTokens = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};
