import PriceOption from './PriceOption';

export default function PriceOptionList() {
  const priceOptions = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 29.99,
      features: [
        'Access to gym during staffed hours',
        'Free fitness assessment',
        'Locker room access',
        'Free group fitness classes',
        'Locker room access',
      ],
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 79.99,
      features: [
        'Unlimited group fitness classes',
        'Locker room access with personal locker',
        'Unlimited personal training sessions',
        'Sauna and spa access',
        'Nutrition consultation',
      ],
    },
    {
      id: 3,
      name: 'Standard Plan',
      price: 49.99,
      features: [
        '24/7 gym access for up to 4 family members',
        'Free group fitness classes',
        'Locker room access',
        'Family fitness assessment',
        'Access to child care during workouts',
      ],
    },
  ];

  return (
    <div className="pt-44 md:pt-12">
      <h2 className="pb-8 text-5xl text-center">Best prices in the town</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {priceOptions.map((priceOption) => (
          <PriceOption key={priceOption.id} priceOption={priceOption} />
        ))}
      </div>
    </div>
  );
}
