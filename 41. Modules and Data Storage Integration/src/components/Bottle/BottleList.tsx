import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { IBottle } from '../../types';
import { retrieveCart, storeCart } from '../../utils';
import Cart from '../Cart/Cart';
import Bottle from './Bottle';

export default function BottleList() {
  const bottles = useFetchData<IBottle>('bottles.json');
  const [cart, setCart] = useState<IBottle[]>([]);

  useEffect(() => {
    const storedCart = retrieveCart(); // Get `cart` from local storage
    setCart(storedCart);
  }, []);

  const handleAddToCart = (bottle: IBottle) => {
    /* 
      ✅ Update the `cart` state with the new item or updated quantity:
      👉 Check if the item already exists in the cart
      👉 Create an updated cart array
      👉 If the item exists, map through the current cart items
          - If the current item matches the new item, increment its `quantity`
          - Otherwise, return the item as it is
      👉 If the item does NOT exist, add it with `quantity: 1`
    */

    setCart((prevCart) => {
      const itemExistsInCart = prevCart.find((item) => item.id === bottle.id);

      const updatedCart = itemExistsInCart
        ? prevCart.map((item) =>
            item.id === bottle.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...bottle, quantity: 1 }];

      storeCart(updatedCart); // Save the updated cart to local storage
      return updatedCart; // Return the updated cart to update the state
    });
  };

  const handleRemoveFromCart = (product: IBottle) => {
    const confirm = window.confirm(
      'Are you sure you want to REMOVE the product from cart?'
    );

    if (confirm) {
      const remainingProducts = cart.filter((item) => item.id !== product.id);
      setCart(remainingProducts);
      storeCart(remainingProducts);
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem('shoppingCart');
    setCart([]);
  };

  return (
    <>
      <h2 className="py-5 text-2xl font-semibold text-center text-white">
        🧴 Bottle List 🧴
      </h2>
      <h3 className="text-xl font-medium text-center text-white pb-7">
        🛒 Cart: {cart.length} 🛒
      </h3>
      <button
        onClick={handleClearCart}
        className="block w-24 mx-auto mb-7 btn btn-sm btn-accent"
      >
        Clear Cart
      </button>

      {/* Showing Cart Items */}
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />

      <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
}
