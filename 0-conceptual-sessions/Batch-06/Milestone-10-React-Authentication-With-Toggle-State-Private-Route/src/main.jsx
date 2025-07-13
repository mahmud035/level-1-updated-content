import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserContext from './context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext>
      <App />
      <ToastContainer position="top-center" autoClose={1000} />
    </UserContext>
  </React.StrictMode>
);
