import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { deleteShoppingCart, removeFromDb } from '../utils/fakeDB';
import CartItem from './Cards/CartItem';

const Cart = () => {
  const [cart, setCart] = useContext(CartContext || []);

  //* Calculate Total Cart Price
  let total = 0;
  if (cart.length > 0) {
    for (const product of cart) {
      total = total + product.price * product.quantity;
    }
  }

  //* Remove Item From Shopping Cart
  const handleRemoveItem = (id) => {
    const remaining = cart.filter((product) => product.id !== id);

    setCart(remaining); // remove item from cart
    removeFromDb(id); // remove item from localStorage

    toast.error('Product Removed! 🔥');
  };

  //* Delete Shopping Cart
  const deleteCartHandler = () => {
    if (cart.length) {
      setCart([]); // remove all data from cart
      deleteShoppingCart(); // remove all data from localStorage

      return toast.error('All Items Removed! 🔥');
    }
    return toast.error('Cart is empty! 🔥');
  };

  //* Place Order
  const orderHandler = () => {
    if (cart.length) {
      setCart([]);
      deleteShoppingCart();
      return toast.success('Order Placed! 👍');
    }
    return toast.error('Cart is empty! 🔥');
  };

  return (
    <div className="flex items-start justify-center min-h-screen text-gray-900 bg-gray-100">
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 ">
        <h2 className="text-xl font-semibold">
          {/* NOTE: Conditionally render text */}
          {cart.length ? 'Review Cart Items' : 'Cart is EMPTY!'}
        </h2>

        <ul className="flex flex-col divide-y divide-gray-700">
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </ul>

        <div className="space-y-1 text-right">
          <p>
            Total amount: <span className="font-semibold">{total}$</span>
          </p>
          <p className="text-sm text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          {/* NOTE: Conditionally render "Clear Cart" & "Back To Shop" button */}
          {cart.length > 0 ? (
            <>
              <button
                type="button"
                onClick={deleteCartHandler}
                className="btn-outlined"
              >
                Clear <span className="sr-only sm:not-sr-only">Cart</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/shop">
                <button
                  type="button"
                  onClick={deleteCartHandler}
                  className="btn-outlined"
                >
                  Back <span className="sr-only sm:not-sr-only">To Shop</span>
                </button>
              </Link>
            </>
          )}

          <button onClick={orderHandler} type="button" className="btn-primary">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
