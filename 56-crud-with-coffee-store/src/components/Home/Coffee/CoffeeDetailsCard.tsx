import { ICoffee } from '../../../types';

interface ICoffeeDetailsCardProps {
  selectedCoffee: ICoffee;
}

export default function CoffeeDetailsCard({
  selectedCoffee,
}: ICoffeeDetailsCardProps) {
  const { name, chef, supplier, taste, category, details } =
    selectedCoffee || {};

  return (
    <div className="grid md:grid-cols-2 gap-16 p-10">
      <img
        src={`https://images.pexels.com/photos/1694874/pexels-photo-1694874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
        alt=""
        className="rounded-lg w-full"
      />
      <div>
        <h3 className="text-3xl font-bold pb-4">Niceties</h3>
        <div className="space-y-2">
          <p>
            <span className="text-lg font-medium">Name:</span> {name}
          </p>
          <p>
            <span className="text-lg font-medium">Chef:</span> {chef}
          </p>
          <p>
            <span className="text-lg font-medium">Supplier:</span>
            &nbsp;{supplier}
          </p>
          <p>
            <span className="text-lg font-medium">Taste:</span> {taste}
          </p>
          <p>
            <span className="text-lg font-medium">Category:</span>
            &nbsp;{category}
          </p>
          <p>
            <span className="text-lg font-medium">Details:</span>
            &nbsp;{details}
          </p>
        </div>
      </div>
    </div>
  );
}
