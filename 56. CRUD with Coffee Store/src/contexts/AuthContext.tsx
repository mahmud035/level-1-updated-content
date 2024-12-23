import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import app from '../firebase/firebase.init';
import { IUpdatedInfo } from '../types';

// Define the shape of the context value
interface IAuthContext {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  githubSignIn: () => Promise<UserCredential>;
  updateUserProfile: (updatedInfo: IUpdatedInfo) => Promise<void> | undefined;
  passwordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext | null>(null);
const auth = getAuth(app);

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);
  const githubProvider = useMemo(() => new GithubAuthProvider(), []);

  //* Create user
  const createUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //* SignIn (email & password)
  const signIn = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //* Update profile
  const updateUserProfile = (
    updatedInfo: IUpdatedInfo
  ): Promise<void> | undefined => {
    if (auth.currentUser) return updateProfile(auth.currentUser, updatedInfo);
  };

  //* Password reset
  const passwordReset = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  //* Google signIn
  const googleSignIn = useCallback((): Promise<UserCredential> => {
    return signInWithPopup(auth, googleProvider);
  }, [googleProvider]);

  //* Github signIn
  const githubSignIn = useCallback((): Promise<UserCredential> => {
    return signInWithPopup(auth, githubProvider);
  }, [githubProvider]);

  //* Logout
  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  //* Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = useMemo<IAuthContext>(
    () => ({
      user,
      loading,
      createUser,
      signIn,
      googleSignIn,
      githubSignIn,
      updateUserProfile,
      passwordReset,
      logout,
    }),
    [user, loading, googleSignIn, githubSignIn]
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export { AuthContext };
