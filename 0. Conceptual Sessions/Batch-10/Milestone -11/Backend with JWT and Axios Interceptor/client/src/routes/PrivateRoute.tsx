import React from 'react';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import useAuth from '../hooks/useAuth';

interface IPrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" state={location.pathname} replace />;

  return children;
}
