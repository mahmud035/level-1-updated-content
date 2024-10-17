import { IBottle } from '../../types';

interface IBottleProps {
  bottle: IBottle;
}

export default function Bottle({ bottle }: IBottleProps) {
  const { name, img, price, quantity, stock, shipping } = bottle;

  return (
    <div className="w-full h-[430px] shadow-xl card bg-base-100">
      <figure>
        <img src={img} alt={name} className="w-full h-48" />
      </figure>
      <div className="p-4 card-body">
        <h2 className="text-xl font-medium card-title">Name: {name}</h2>
        <p>Price: {price}$</p>
        <p>Quantity: {quantity}</p>
        <p>Stock: {stock}</p>
        <p>Shipping: {shipping}</p>
        <button className={`btn btn-sm`}>Button</button>
      </div>
    </div>
  );
}
