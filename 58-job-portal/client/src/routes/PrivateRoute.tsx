import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/shared/Loading';
import useAuth from '../hooks/useAuth';

interface IPrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" state={location.pathname} replace />;

  return children;
}
