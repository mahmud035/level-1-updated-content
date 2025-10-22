import { useMutation } from '@tanstack/react-query';
import { ILoginData, IUser } from '../../types/auth';
import {
  clearTokens,
  generateTokens,
  refreshAccessToken,
  registerUser,
} from './auth.api';

//* Mutation Hooks
// Register (Save new user into db)
export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: (user: IUser) => registerUser(user),
  });
};

// Login (Generate Tokens)
export const useGenerateTokensMutation = () => {
  return useMutation({
    mutationFn: (loginData: ILoginData) => generateTokens(loginData),
  });
};

// Refresh token (refresh access token)
export const useRefreshAccessTokenMutation = () => {
  return useMutation({
    mutationFn: refreshAccessToken,
  });
};

// Logout (Clear Tokens)
export const useClearTokensMutation = () => {
  return useMutation({
    mutationFn: clearTokens,
  });
};
