import React, { createContext, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Modal from './components/Modal';

//* Context API
export const ProductContext = createContext([]);
export const CartContext = createContext([]);

/**
 * NOTE: Why we provide value={[cart, setCart]} for CartContext?
 * Because cart data can be changed over the time. User can add product to the cart or remove product from the cart. That's why we use state for managing cart data according to the user interaction.
 */

const App = () => {
  const { products, initialCart } = useLoaderData(); //* get products & initialCart data using loader
  const [cart, setCart] = useState(initialCart);
  let [isOpen, setIsOpen] = useState(false);

  const cartAlert = sessionStorage.getItem('alert');

  if (initialCart.length > 0 && cartAlert !== 'true') {
    setIsOpen(true);
    sessionStorage.setItem('alert', true);
  }

  return (
    <ProductContext.Provider value={products}>
      <CartContext.Provider value={[cart, setCart]}>
        <Header />
        <div className="md:min-h-[calc(100vh-137px)]">
          <Outlet />
        </div>
        <Footer />
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </CartContext.Provider>
    </ProductContext.Provider>
  );
};

export default App;
