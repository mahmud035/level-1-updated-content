import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useClearTokensMutation } from '../api/auth/auth.hooks';
import useAuth from './useAuth';

export default function useLogout() {
  const clearTokensMutation = useClearTokensMutation();
  const queryClient = useQueryClient();
  const { setUser, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
    logout().then(() => {
      clearTokensMutation.mutate();
      queryClient.cancelQueries(); // Cancel ongoing queries
      setUser(null);
      navigate('/login');
    });
  };

  return logoutUser;
}
