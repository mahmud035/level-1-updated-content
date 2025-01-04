import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useClearTokensMutation } from '../api/auth/auth.hooks';
import axiosInstance from '../config/axios.config';
import useAuth from '../hooks/useAuth';

interface IAxiosProviderProps {
  children: React.ReactNode;
}

// IMPORTANT: Why am I using AxiosContext?
// 🔥 To utilize Axios interceptors and maintain the folder structure for TanStack Query integration.

const AxiosContext = createContext(axiosInstance);

export default function AxiosProvider({ children }: IAxiosProviderProps) {
  const clearTokensMutation = useClearTokensMutation();
  const queryClient = useQueryClient();
  const { setUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //* Axios Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        toast.error(error?.response?.data?.message || 'Invalid token');

        if (error.status === 401 || error.status === 403) {
          logout().then(() => {
            clearTokensMutation.mutate();
            queryClient.cancelQueries(); // Cancel ongoing queries
            setUser(null);
            navigate('/login');
          });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [clearTokensMutation, logout, navigate, queryClient, setUser]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}
