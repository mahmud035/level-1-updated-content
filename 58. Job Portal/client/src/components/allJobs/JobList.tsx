import { useState } from 'react';
import { useGetJobsQuery } from '../../api/job/job.hooks';
import { IJob } from '../../types/job';
import JobCard from '../home/JobCard';
import Loading from '../shared/Loading';

export default function JobList() {
  const [page, setPage] = useState(1);
  const getJobsQuery = useGetJobsQuery(page);
  const { isPending, data, isPlaceholderData } = getJobsQuery;
  const totalPages = Math.ceil(data?.meta?.total / data?.meta?.limit) || 1; // Better approach

  if (isPending) return <Loading />;

  return (
    <section id="featured-jobs" className="py-24">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.data?.map((job: IJob) => (
          <JobCard key={job?._id} job={job} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-2 mt-7">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-teal-500 rounded disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
        >
          Prev
        </button>

        {/* Dynamically generates a series of page number buttons using Array.from() */}

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-2 rounded ${
                page === pageNumber
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || page === totalPages}
          className="px-4 py-2 text-white bg-teal-500 rounded disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </section>
  );
}
