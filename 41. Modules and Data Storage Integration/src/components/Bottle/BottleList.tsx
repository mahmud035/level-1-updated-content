import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { IBottle } from '../../types';
import Bottle from './Bottle';

export default function BottleList() {
  const bottles = useFetchData<IBottle>('bottles.json');
  const [cart, setCart] = useState<IBottle[]>([]);

  const handleAddToCart = (bottle: IBottle) => {
    setCart((prevCart) => [...prevCart, bottle]);
  };

  return (
    <>
      <h2 className="pt-8 text-2xl font-semibold text-center text-white">
        🧴 Bottle List 🧴
      </h2>
      <h3 className="pt-5 pb-8 text-xl font-medium text-center text-white">
        🛒 Cart: {cart.length} 🛒
      </h3>

      <div className="grid grid-cols-1 gap-5 pb-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
