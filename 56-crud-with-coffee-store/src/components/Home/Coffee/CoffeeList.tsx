import { ICoffee } from '../../../types';
import CoffeeCard from './CoffeeCard';

interface ICoffeeListProps {
  coffees: ICoffee[];
  setSelectedCoffee: React.Dispatch<React.SetStateAction<ICoffee | null>>;
  handleEdit: (coffee: ICoffee) => void;
  handleDelete: (id: string) => void;
}

export default function CoffeeList({
  coffees,
  handleEdit,
  handleDelete,
  setSelectedCoffee,
}: ICoffeeListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {coffees.length > 0 ? (
        coffees.map((coffee: ICoffee) => (
          <CoffeeCard
            key={coffee._id}
            coffee={coffee}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setSelectedCoffee={setSelectedCoffee}
          />
        ))
      ) : (
        <p className="col-span-2 py-12 text-3xl text-center">
          No Coffee Found!
        </p>
      )}
    </div>
  );
}
