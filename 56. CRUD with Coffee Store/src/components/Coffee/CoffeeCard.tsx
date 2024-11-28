import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';
import { ICoffee } from '../../types';

interface ICoffeeCardProps {
  coffee: ICoffee;
  handleEdit: (coffee: ICoffee) => void;
  handleDelete: (id: string) => void;
}

export default function CoffeeCard({
  coffee,
  handleEdit,
  handleDelete,
}: ICoffeeCardProps) {
  const { _id, name, chef, price } = coffee;

  return (
    <div className="bg-[#F5F4F1] rounded-xl p-8 flex flex-col xl:flex-row justify-between xl:items-center space-y-6 xl:space-y-0">
      <img
        src={`https://images.pexels.com/photos/1694874/pexels-photo-1694874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
        alt=""
        className="xl:w-48 h-60 rounded-lg w-full"
      />
      <div className="space-y-4">
        <p>
          <span className="text-lg">Name:</span> {name}
        </p>
        <p>
          <span className="text-lg">Chef:</span> {chef}
        </p>
        <p>
          <span className="text-lg">Price:</span> {price}$
        </p>
      </div>
      <div className="flex xl:flex-col gap-3.5 w-fit">
        <button className="bg-[#D2B48C] p-2 rounded">
          <MdOutlineRemoveRedEye className=" text-white" />
        </button>
        <button
          onClick={() => handleEdit(coffee)}
          className="bg-[#3C393B] p-2 rounded"
        >
          <MdOutlineModeEditOutline className=" text-white" />
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-[#EA4744] p-2 rounded"
        >
          <MdOutlineDeleteOutline className=" text-white" />
        </button>
      </div>
    </div>
  );
}
