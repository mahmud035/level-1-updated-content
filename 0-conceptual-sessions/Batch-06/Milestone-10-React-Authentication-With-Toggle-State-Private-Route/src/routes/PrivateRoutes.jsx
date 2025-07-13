import React, { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../shared/Spinner';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
