import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductProvider from './context/ProductProvider';
import CartProvider from './context/CartProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
        <ToastContainer position="top-center" autoClose={1000} />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
