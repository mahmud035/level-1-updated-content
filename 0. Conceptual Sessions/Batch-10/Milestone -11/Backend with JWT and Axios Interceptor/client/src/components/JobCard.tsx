import { format } from 'date-fns';
import { Link } from 'react-router';
import useSearch from '../hooks/search/useSearch';
import { IJob } from '../types/job';

interface IJobCardProps {
  job: IJob;
}

const JobCard = ({ job }: IJobCardProps) => {
  const { searchQuery } = useSearch();

  const {
    _id,
    title,
    description,
    category,
    minimumPrice,
    maximumPrice,
    deadline,
    bidCount,
  } = job || {};

  return (
    <Link
      to={`/job/${_id}`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-800 ">
          {/* Deadline: {new Date(deadline).toLocaleDateString()} */}
          Deadline: {format(new Date(deadline), 'MM/dd/yyyy')}
        </span>
        <span className="px-3 py-1 text-[9px] text-blue-800 uppercase bg-blue-200 font-extrabold rounded-full ">
          {category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {searchQuery
            ? title.split(new RegExp(`(${searchQuery})`, 'i')).map((char, i) =>
                char.toLowerCase() === searchQuery.toLowerCase() ? (
                  <span key={i} className="text-[#00d991]">
                    {char}
                  </span>
                ) : (
                  <span key={i}>{char}</span>
                )
              )
            : title}
        </h1>

        <p className="mt-2 text-sm text-gray-600 ">
          {description && description?.length > 120
            ? `${description.slice(0, 121)}...`
            : description}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Range: ${minimumPrice} - ${maximumPrice}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Total Bids: {bidCount ?? 0}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
