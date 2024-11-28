import { IFormData } from '../../types';
import FormControl from './FormControl';

interface IInputRowProps {
  label1: keyof IFormData;
  label2: keyof IFormData;
  formData: IFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputRow({
  label1,
  label2,
  handleChange,
  formData,
}: IInputRowProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full pb-6">
      <FormControl
        label={label1}
        handleChange={handleChange}
        formData={formData}
      />
      <FormControl
        label={label2}
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
}
