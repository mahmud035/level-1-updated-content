import { ICoffee } from '../../../types';
import CoffeeActions from './CoffeeActions';

interface ICoffeeCardProps {
  coffee: ICoffee;
  setSelectedCoffee: React.Dispatch<React.SetStateAction<ICoffee | null>>;
  handleEdit: (coffee: ICoffee) => void;
  handleDelete: (id: string) => void;
}

export default function CoffeeCard({
  coffee,
  handleEdit,
  handleDelete,
  setSelectedCoffee,
}: ICoffeeCardProps) {
  const { name, chef, price } = coffee;

  return (
    <div className="bg-[#F5F4F1] rounded-xl p-8 flex flex-col xl:flex-row justify-between xl:items-center space-y-6 xl:space-y-0">
      <img
        src={`https://images.pexels.com/photos/1694874/pexels-photo-1694874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
        alt=""
        className="object-cover object-center w-full rounded-lg xl:w-48 h-60 2xl:w-56"
      />
      <div className="space-y-4">
        <p>
          <span className="text-lg font-medium">Name:</span> {name}
        </p>
        <p>
          <span className="text-lg font-medium">Chef:</span> {chef}
        </p>
        <p>
          <span className="text-lg font-medium">Price:</span> {price}$
        </p>
      </div>

      {/* Coffee actions */}
      <CoffeeActions
        coffee={coffee}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setSelectedCoffee={setSelectedCoffee}
      />
    </div>
  );
}
