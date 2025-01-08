import React from 'react';
import { MdSearch } from 'react-icons/md';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import { MAX_SALARY, MIN_SALARY } from '../../utils/job';

interface IJobSearchSortFilterProps {
  sortBy: string | undefined;
  setSortBy: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFilter: (e: React.FormEvent<HTMLFormElement>) => void;
  minSalary: number;
  maxSalary: number;
  setMinSalary: React.Dispatch<React.SetStateAction<number>>;
  setMaxSalary: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
  isJobFound: boolean;
}

export default function JobSearchSortFilter({
  sortBy,
  setSortBy,
  handleSearch,
  handleFilter,
  minSalary,
  maxSalary,
  setMinSalary,
  setMaxSalary,
  setPage,
  isFetching,
  isJobFound,
}: IJobSearchSortFilterProps) {
  const { searchQuery, setSearchQuery } = useSearchAndFilter();

  return (
    <>
      <div className="flex items-center gap-4 p-3 mx-auto bg-base-200">
        {/* Job Sorting */}
        <button
          onClick={() => {
            if (sortBy !== 'salaryRange.min') setSortBy('salaryRange.min');
            else setSortBy('createdAt');
          }}
          disabled={isJobFound !== true}
          className={`btn btn-neutral disabled:cursor-not-allowed ${
            sortBy === 'salaryRange.min' && 'btn-success'
          }`}
        >
          {sortBy === 'salaryRange.min' ? 'Sorted By Salary' : 'Sort By Salary'}
        </button>

        {/* Job Searching */}
        <form onSubmit={handleSearch} className="relative flex w-full gap-4">
          {isFetching && searchQuery ? (
            <span className="absolute loading loading-spinner loading-xs top-4 left-2"></span>
          ) : (
            <MdSearch size={20} className="absolute top-4 left-2" />
          )}

          <input
            type="text"
            defaultValue={searchQuery}
            onChange={(e) => {
              setPage(1);
              setSearchQuery(e.target.value);
            }}
            className="w-full pl-8 max-w-96 input"
            placeholder="Search jobs by title, location"
          />
        </form>

        {/* Job Filtering Based on `salaryRange.min` & `salaryRange.max` */}
        <form onSubmit={handleFilter}>
          <div className="flex gap-4">
            <input
              type="number"
              defaultValue={minSalary}
              onChange={(e) => {
                setPage(1);
                const value = e.target.value;
                setMinSalary(value === '' ? MIN_SALARY : parseInt(value));
              }}
              className="w-full max-w-72 input"
              placeholder="Min Salary"
              min={MIN_SALARY}
              max={MAX_SALARY}
            />
            <input
              type="number"
              defaultValue={maxSalary}
              onChange={(e) => {
                setPage(1);
                const value = e.target.value;
                setMaxSalary(value === '' ? MAX_SALARY : parseInt(value));
              }}
              className="w-full max-w-72 input"
              placeholder="Max Salary"
              min={MIN_SALARY}
              max={MAX_SALARY}
            />
          </div>
        </form>
      </div>
    </>
  );
}
