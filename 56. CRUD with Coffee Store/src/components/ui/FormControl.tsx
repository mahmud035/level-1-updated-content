import { IFormData } from '../../types';

interface IFormControlProps {
  label: keyof IFormData;
  formData: IFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormControl({
  label,
  handleChange,
  formData,
}: IFormControlProps) {
  return (
    <div className="w-full">
      <label htmlFor="name" className="block pb-3 capitalize">
        {label}
      </label>
      <input
        type="text"
        id={label}
        name={label}
        value={formData[label]}
        onChange={handleChange}
        placeholder={`Enter coffee ${label}`}
        className="rounded w-full py-2.5 outline-none border-none focus:outline pl-3"
        required
      />
    </div>
  );
}
