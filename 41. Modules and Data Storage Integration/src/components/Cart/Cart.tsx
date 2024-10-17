import { IBottle } from '../../types';
import CartItem from './CartItem';

interface ICartProps {
  cart: IBottle[];
  handleRemoveFromCart: (product: IBottle) => void;
}

export default function Cart({ cart, handleRemoveFromCart }: ICartProps) {
  const totalAmount = cart.reduce((acc, curr) => {
    return curr.price * curr.quantity + acc;
  }, 0);

  return (
    <div className="flex flex-col max-w-3xl p-6 mx-auto space-y-4 rounded-lg mb-7 sm:p-10 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold">Your cart</h2>
      <div className="flex flex-col divide-y divide-gray-700">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))
        ) : (
          <p className="py-5 text-2xl font-semibold text-center text-white">
            You haven't added any products to the cart yet! 😟
          </p>
        )}
      </div>
      <div className="space-y-1 text-right">
        <p>
          Total amount:
          <span className="text-lg font-semibold"> {totalAmount} $</span>
        </p>
      </div>
    </div>
  );
}
