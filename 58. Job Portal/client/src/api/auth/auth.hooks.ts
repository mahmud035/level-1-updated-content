import { useMutation } from '@tanstack/react-query';
import { IUser } from '../../types/auth';
import { clearTokens, generateTokens, refreshAccessToken } from './auth.api';

//* Mutation Hooks

// NOTE: If I don't use firebase for authentication, then this hook name should be "useLoginUserMutation".

export const useGenerateTokensMutation = () => {
  return useMutation({
    mutationFn: (user: IUser) => generateTokens(user),
  });
};

export const useRefreshAccessTokenMutation = () => {
  return useMutation({
    mutationFn: () => refreshAccessToken(),
  });
};

export const useClearTokensMutation = () => {
  return useMutation({
    mutationFn: () => clearTokens(),
  });
};
