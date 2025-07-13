import useAuth from './useAuth';

export default function useJobOwner() {
  const { user } = useAuth();

  const jobOwnerInfo = {
    name: user?.displayName ?? '',
    email: user?.email ?? '',
    photoURL: user?.photoURL ?? '',
  };

  return jobOwnerInfo;
}
