import { FaCircleCheck } from 'react-icons/fa6';

interface IFeatureProps {
  feature: string;
}

export default function Feature({ feature }: IFeatureProps) {
  return (
    <li key={feature} className="flex items-center gap-3">
      <FaCircleCheck size={14} />
      {feature}
    </li>
  );
}
