import React, { createContext, useEffect } from 'react';
// import toast from 'react-hot-toast';
import { useRefreshAccessTokenMutation } from '../api/auth/auth.hooks';
import axiosInstance from '../config/axios.config';
import useLogout from '../hooks/useLogout';

interface IAxiosProviderProps {
  children: React.ReactNode;
}

// IMPORTANT: Why am I using AxiosContext?
// 🔥 To utilize Axios interceptors and maintain the folder structure for TanStack Query integration.

const AxiosContext = createContext(axiosInstance);

export default function AxiosProvider({ children }: IAxiosProviderProps) {
  const refreshAccessTokenMutation = useRefreshAccessTokenMutation();
  const logoutUser = useLogout();

  useEffect(() => {
    //* Axios Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Check for expired access token (401)
        if (error.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await refreshAccessTokenMutation.mutateAsync(); // Call refresh token endpoint
            return axiosInstance(originalRequest); // Retry the original request
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            logoutUser();
          }
        }

        // Check for forbidden access (403)
        if (error.status === 403) logoutUser();

        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshAccessTokenMutation, logoutUser]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}
