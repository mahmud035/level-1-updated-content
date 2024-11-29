import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';
import { ICoffee } from '../../../types';
import { showModal } from '../../../utils';

interface ICoffeeActionsProps {
  coffee: ICoffee;
  setSelectedCoffee: React.Dispatch<React.SetStateAction<ICoffee | null>>;
  handleEdit: (coffee: ICoffee) => void;
  handleDelete: (id: string) => void;
}

export default function CoffeeActions({
  coffee,
  handleEdit,
  handleDelete,
  setSelectedCoffee,
}: ICoffeeActionsProps) {
  return (
    <div className="flex xl:flex-col gap-3.5 w-fit">
      <button
        onClick={() => {
          setSelectedCoffee(coffee);
          showModal('coffee-modal');
        }}
        className="bg-[#D2B48C] p-2 rounded"
      >
        <MdOutlineRemoveRedEye className="text-white " />
      </button>
      <button
        onClick={() => {
          setSelectedCoffee(null);
          handleEdit(coffee);
        }}
        className="bg-[#3C393B] p-2 rounded"
      >
        <MdOutlineModeEditOutline className="text-white " />
      </button>
      <button
        onClick={() => handleDelete(coffee._id)}
        className="bg-[#EA4744] p-2 rounded"
      >
        <MdOutlineDeleteOutline className="text-white " />
      </button>
    </div>
  );
}
