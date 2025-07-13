import { IJobCategory } from '../../types';
import { getImageURL } from '../../utils';

interface IJobCategoryCardProps {
  category: IJobCategory;
}

export default function JobCategoryCard({ category }: IJobCategoryCardProps) {
  const { logo, category_name, availability } = category;

  return (
    <div className="p-10 flex flex-col gap-2 font-light rounded-md bg-gradient-to-r from-[rgba(126,144,254,0.05)] to-[rgba(152,115,255,0.05)]">
      <img
        src={getImageURL('icons', logo)}
        alt=""
        className="w-[70px] h-[70px] p-3 mb-3 rounded-lg bg-gradient-to-r from-[rgba(126,144,254,0.1)] to-[rgba(152,115,255,0.1)]"
      />
      <p className="text-xl text-[#474747]">{category_name}</p>
      <p className="text-[#A3A3A3]">{availability}</p>
    </div>
  );
}
