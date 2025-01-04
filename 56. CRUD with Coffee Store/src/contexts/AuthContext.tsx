import {
  createUserWithEmailAndPassword,
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
import React, { createContext, useEffect, useMemo, useState } from 'react';
import auth from '../config/firebase.config';

// Define the shape of the context value
interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithGithub: () => Promise<UserCredential>;
  updateUserProfile: (
    displayName: string,
    photoURL: string
  ) => Promise<void> | undefined;
  passwordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);
  const githubProvider = useMemo(() => new GithubAuthProvider(), []);

  //* Create New User
  const createUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //* Login Existing User
  const loginUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //* Login with Google
  const loginWithGoogle = (): Promise<UserCredential> => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //* Login with Github
  const loginWithGithub = (): Promise<UserCredential> => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  //* Update a User's Profile
  const updateUserProfile = (
    displayName: string,
    photoURL: string
  ): Promise<void> | undefined => {
    if (auth.currentUser) {
      setLoading(true);
      return updateProfile(auth.currentUser, { displayName, photoURL });
    }
  };

  //* Password reset
  const passwordReset = (email: string): Promise<void> => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  //* Logout a User
  const logout = (): Promise<void> => {
    setLoading(true);
    return signOut(auth);
  };

  //* Get the Currently Logged-in User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      }

      return () => unsubscribe();
    });
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    loginUser,
    loginWithGoogle,
    loginWithGithub,
    updateUserProfile,
    passwordReset,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export { AuthContext };
