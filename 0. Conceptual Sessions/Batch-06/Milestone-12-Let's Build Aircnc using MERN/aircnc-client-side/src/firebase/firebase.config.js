import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDKZQlAA3L-QI6yDHyGZspYP51hhJ-iLF0',
  authDomain: 'aircnc-client-side.firebaseapp.com',
  projectId: 'aircnc-client-side',
  storageBucket: 'aircnc-client-side.appspot.com',
  messagingSenderId: '465396488131',
  appId: '1:465396488131:web:ad566d9b99fe4c715c4f76',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
