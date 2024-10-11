import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductProvider';
import Product from './Product';
import { CartContext } from '../context/CartProvider';
import { addToDb } from '../utils/fakeDB';
import { toast } from 'react-toastify';

const Shop = () => {
  const products = useContext(ProductContext);
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const exist = cart.find(
      (existingProduct) => existingProduct.id === product.id
    );

    console.log(exist);

    if (!exist) {
      // set new product quantity
      product.quantity = 1;
      setCart([...cart, product]);
    } else {
      const restProducts = cart.filter(
        (existingProduct) => existingProduct.id !== product.id
      );
      // update existing product quantity
      exist.quantity = exist.quantity + 1;
      setCart([...restProducts, exist]);
    }

    // Add product to local storage
    addToDb(product.id);
    toast.success('Product added successfully');
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 row-gap-5 mb-8 lg:grid-cols-3 lg:row-gap-8">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
