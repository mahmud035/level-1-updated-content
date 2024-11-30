export interface IFormData {
  name: string;
  chef: string;
  supplier: string;
  taste: string;
  category: string;
  details: string;
  price: string;
  photoURL: string;
}

export interface ICoffee {
  _id: string;
  name: string;
  chef: string;
  supplier: string;
  taste: string;
  category: string;
  details: string;
  price: string;
  photoURL: string;
}

export interface IUpdatedInfo {
  displayName?: string;
  photoURL?: string;
}

export interface IUserInfo {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderDatum[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

interface ProviderDatum {
  providerId: string;
  uid: string;
  displayName: null;
  email: string;
  phoneNumber: null;
  photoURL: null;
}
