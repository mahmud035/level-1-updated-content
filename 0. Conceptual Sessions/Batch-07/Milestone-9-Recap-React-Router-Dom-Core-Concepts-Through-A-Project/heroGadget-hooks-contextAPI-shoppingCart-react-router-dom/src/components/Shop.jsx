import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { CartContext, ProductContext } from '../App';
import { addToDb } from '../utils/fakeDB';
import ProductCard from './Cards/ProductCard';

const Shop = () => {
  // receive products and cart data using useContext
  const products = useContext(ProductContext || []);
  const [cart, setCart] = useContext(CartContext || []);

  // IMPORTANT:
  const handleAddToCart = (product) => {
    let newCart = [];

    const exists = cart.find(
      (existingProduct) => existingProduct.id === product.id
    );

    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      const rest = cart.filter(
        (existingProduct) => existingProduct.id !== product.id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart); //* set product to cart
    addToDb(product.id); //* set product id & product quantity to localStorage

    toast.success('Product Added! 🛒', { autoClose: 500 });
  };

  return (
    <div className="my-container">
      <div className="product-container">
        {products.map((product) => (
          <ProductCard
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
