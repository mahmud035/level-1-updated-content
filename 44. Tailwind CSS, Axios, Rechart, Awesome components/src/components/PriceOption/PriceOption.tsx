import { IPriceOption } from '../../types';
import Feature from './Feature';

interface IPriceOptionProps {
  priceOption: IPriceOption;
}

export default function PriceOption({ priceOption }: IPriceOptionProps) {
  const { name, price, features } = priceOption;

  return (
    <div
      className={`flex flex-col justify-between gap-6 p-8 rounded-lg cursor-pointer duration-500 ${
        name === 'Premium Plan'
          ? 'bg-teal-900 hover:bg-teal-800'
          : 'bg-cyan-900 hover:bg-cyan-800'
      }`}
    >
      <h2 className="text-center">
        <span className="font-semibold text-7xl">{price}</span>
        <span className="text-2xl">/month</span>
      </h2>
      <h4 className="text-3xl text-center">{name}</h4>

      <ul className="flex flex-col gap-4 pt-8">
        {features.map((feature) => (
          <Feature key={feature} feature={feature} />
        ))}
      </ul>

      <button className="w-full py-2 font-semibold rounded-lg bg-neutral-900">
        Buy Now
      </button>
    </div>
  );
}
