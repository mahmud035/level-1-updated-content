import React, { useState } from 'react';
import { useGetJobsQuery } from '../../api/job/job.hooks';
import JobList from '../../components/allJobs/JobList';
import JobPagination from '../../components/allJobs/JobPagination';
import JobSearchSortFilter from '../../components/allJobs/JobSearchSortFilter';
import Loading from '../../components/shared/Loading';
import NoDataFound from '../../components/shared/NoDataFound';
import useDebounce from '../../hooks/search/useDebounce';
import useSearch from '../../hooks/search/useSearch';
import { MAX_SALARY, MIN_SALARY } from '../../utils/job';

export default function AllJobPage() {
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>();
  const { searchQuery } = useSearch();
  const [minSalary, setMinSalary] = useState<number>(MIN_SALARY);
  const [maxSalary, setMaxSalary] = useState<number>(MAX_SALARY);

  // Debounce searchQuery, minSalary and maxSalary
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms debounce
  const debouncedMinSalary = useDebounce(minSalary, 500);
  const debouncedMaxSalary = useDebounce(maxSalary, 500);

  // Fetch Data with debounced values
  const getJobsQuery = useGetJobsQuery({
    page,
    sortBy,
    searchQuery: debouncedSearchQuery,
    minSalary: debouncedMinSalary,
    maxSalary: debouncedMaxSalary,
  });
  const { isPending, data, isPlaceholderData, isFetching } = getJobsQuery;
  const totalPages = Math.ceil(data?.meta?.total / data?.meta?.limit) || 1; // Better approach

  if (isPending) return <Loading />;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <section className="pt-10">
      <JobSearchSortFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        minSalary={minSalary}
        maxSalary={maxSalary}
        setMinSalary={setMinSalary}
        setMaxSalary={setMaxSalary}
        setPage={setPage}
        isFetching={isFetching}
        isJobFound={data?.data?.length > 0}
      />

      {data?.data?.length > 0 ? (
        <JobList jobs={data?.data} />
      ) : (
        <NoDataFound message="No Job Found" />
      )}

      {data?.data?.length > 0 && (
        <JobPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          isPlaceholderData={isPlaceholderData}
        />
      )}
    </section>
  );
}
