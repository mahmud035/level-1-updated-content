import PriceOption from './PriceOption';

export default function PriceOptionList() {
  const priceOptions = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 29.99,
      features: [
        'Access to gym during staffed hours',
        'Locker room access',
        '1 complimentary fitness assessment',
        '10% discount on protein bars',
        'Access to treadmills and stationary bikes',
      ],
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 79.99,
      features: [
        '24/7 gym access',
        'Unlimited group fitness classes',
        'Access to private locker room with towels',
        'Unlimited personal training sessions',
        'Free entry to fitness workshops and seminars',
      ],
    },
    {
      id: 3,
      name: 'Standard Plan',
      price: 49.99,
      features: [
        '24/7 gym access',
        'Access to all cardio equipment',
        'Free access to 3 group fitness classes per week',
        '1 personal training session per month',
        'Free access to sauna',
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
