import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext([]);

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductContext.Provider value={products}>
        {children}
      </ProductContext.Provider>
    </>
  );
};

export default ProductProvider;
