import { format } from 'date-fns';
import { IJobBid } from '../../types/jobBid';

interface IBidRequestCardProps {
  jobBid: IJobBid;
}

export default function BidRequestCard({ jobBid }: IBidRequestCardProps) {
  const { jobTitle, jobCategory, bidAmount, bidDeadline, bidderEmail } =
    jobBid || {};

  return (
    <tr>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {jobTitle}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {bidderEmail}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {format(new Date(bidDeadline), 'MM/dd/yyyy')}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        ${bidAmount}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <p className="px-3 py-1 text-xs text-blue-500 rounded-full bg-blue-100/60">
            {jobCategory}
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center px-3 py-1 text-yellow-500 rounded-full gap-x-2 bg-yellow-100/60">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
          <h2 className="text-sm font-normal ">Complete</h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <button className="text-gray-500 transition-colors duration-200 disabled:cursor-not-allowed hover:text-red-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>

          <button className="text-gray-500 transition-colors duration-200 disabled:cursor-not-allowed hover:text-yellow-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
