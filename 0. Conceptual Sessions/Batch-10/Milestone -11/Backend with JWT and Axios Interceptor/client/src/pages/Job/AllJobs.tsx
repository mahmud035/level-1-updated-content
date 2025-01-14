import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useGetJobsQuery } from '../../api/job/job.hooks';
import JobCard from '../../components/Job/JobCard';
import JobPagination from '../../components/Job/JobPagination';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import NoDataFound from '../../components/shared/NoDataFound';
import useDebounce from '../../hooks/search/useDebounce';
import useSearch from '../../hooks/search/useSearch';
import { IJob } from '../../types/job';

const AllJobs = () => {
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { searchQuery, setSearchQuery } = useSearch();
  const [category, setCategory] = useState<string>('');

  // Debounce searchQuery value
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms debounce

  // Fetch Data with debounced values
  const getJobsQuery = useGetJobsQuery({
    page,
    sortBy,
    sortOrder,
    searchQuery: debouncedSearchQuery,
    category,
  });
  const { isPending, data, isFetching, isPlaceholderData } = getJobsQuery;
  const totalPages = Math.ceil(data?.meta?.total / data?.meta?.limit) || 1; // Better approach

  if (isPending) return <LoadingSpinner />;

  // Filtering Jobs
  const handleFilterJobs = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  // Searching Jobs
  const handleSearchJobs = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  // Sorting Jobs
  const handleSortJobs = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setSortBy('createdAt');
      setSortOrder('desc');
      setPage(1);
    } else {
      setSortBy('deadline');
      setSortOrder(e.target.value as 'asc' | 'desc');
      setPage(1);
    }
  };

  // Reset
  const handleReset = () => {
    setPage(1);
    setSortBy('createdAt');
    setSortOrder('desc');
    setSearchQuery('');
    setCategory('');
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      {/* Job Actions */}
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row ">
        {/* Job Filtering Based on `category` */}
        <div>
          <select
            name="category"
            value={category}
            onChange={handleFilterJobs}
            id="category"
            disabled={data?.data?.length === 0}
            className="p-4 border rounded-lg disabled:cursor-not-allowed"
          >
            <option value="">Filter By Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphics Design">Graphics Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        {/* Job Searching */}
        <form onSubmit={handleSearchJobs}>
          <div className="relative flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            {isFetching && searchQuery ? (
              <span className="absolute loading loading-spinner loading-xs top-4 left-2"></span>
            ) : (
              <MdSearch size={20} className="absolute top-4 left-2" />
            )}

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="px-8 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              name="search"
              placeholder="Search By Title or Category"
              aria-label="Enter Job Title"
            />

            <button
              type="submit"
              className="px-1 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md md:px-4 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>

        {/* Job Sorting */}
        <div>
          <select
            name="sorting"
            value={sortBy === 'deadline' ? sortOrder : ''}
            onChange={handleSortJobs}
            id="sorting"
            disabled={data?.data?.length === 0}
            className="p-4 border rounded-md disabled:cursor-not-allowed"
          >
            <option value="">Sort By Deadline</option>
            <option value="desc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>

      {/* JobList */}
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data?.length > 0 ? (
          data?.data?.map((job: IJob) => <JobCard key={job._id} job={job} />)
        ) : (
          <NoDataFound message="No Job Found" />
        )}
      </div>

      {/* Job Pagination */}
      {data?.data?.length > 0 && (
        <JobPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          isPlaceholderData={isPlaceholderData}
        />
      )}
    </div>
  );
};

export default AllJobs;
