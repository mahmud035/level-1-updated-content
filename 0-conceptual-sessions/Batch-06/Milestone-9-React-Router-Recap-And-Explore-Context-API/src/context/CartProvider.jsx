import React, { createContext, useContext, useState } from 'react';
import { cartData } from '../utils/getCartData';
import { ProductContext } from './ProductProvider';

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
  const products = useContext(ProductContext);
  const [cart, setCart] = useState(cartData(products));

  // FIXME: local storage theke data thik moto paiteche na. reload dile Cart er data cole jacche!!

  console.log(cart);

  const info = { cart, setCart };

  return <CartContext.Provider value={info}>{children}</CartContext.Provider>;
};

export default CartProvider;
