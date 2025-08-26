import React from 'react';

const ProductCard = ({ product, handleAddToCart }) => {
  const { name, picture, price, category } = product;

  return (
    <div className="p-6 bg-gray-100 rounded shadow-lg">
      <img
        className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
        src={picture}
        alt=""
      />
      <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">{name}</p>
      <p className="text-gray-700 ">Category: {category}</p>
      <p className="font-bold text-gray-700">Price: {price}$</p>
      <button
        onClick={() => handleAddToCart(product)}
        type="button"
        className="block w-full btn-primary"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
