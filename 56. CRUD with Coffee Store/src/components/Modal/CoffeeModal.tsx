import { IFormData } from '../../types';
import InputRow from '../ui/InputRow';

interface ICoffeeModalProps {
  formData: IFormData;
  editingId: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CoffeeModal({
  handleChange,
  handleSubmit,
  formData,
  editingId,
}: ICoffeeModalProps) {
  return (
    <dialog id="coffee-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-[#F4F3F0] p-10">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-outline btn-ghost absolute right-4 top-4">
            ✕
          </button>
        </form>
        <div className="text-center">
          <h3 className="font-bold text-4xl">
            {editingId ? 'Update Existing Coffee Details' : 'Add New Coffee'}
          </h3>
          <p className="py-4 max-w-[900px] mx-auto">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>

        {/* Create or Update Coffee Form */}
        <form onSubmit={handleSubmit}>
          <InputRow
            label1="name"
            label2="chef"
            handleChange={handleChange}
            formData={formData}
          />
          <InputRow
            label1="supplier"
            label2="taste"
            handleChange={handleChange}
            formData={formData}
          />
          <InputRow
            label1="category"
            label2="details"
            handleChange={handleChange}
            formData={formData}
          />
          <InputRow
            label1="price"
            label2="photoURL"
            handleChange={handleChange}
            formData={formData}
          />
          <button className="btn-add-update">
            {editingId ? 'Update Coffee Details' : 'Add Coffee'}
          </button>
        </form>
      </div>
    </dialog>
  );
}
