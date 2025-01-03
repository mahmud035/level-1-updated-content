import axiosInstance from '../../config/axios.config';
import { IUser } from '../../types/auth';

// NOTE: If I don't use firebase for authentication, then this function name should be "loginUser".

export const generateTokens = async (user: IUser) => {
  const { data } = await axiosInstance.post('/auth/login', user);
  return data;
};

export const clearTokens = async (user: IUser) => {
  const { data } = await axiosInstance.post('/auth/logout', user);
  return data;
};
