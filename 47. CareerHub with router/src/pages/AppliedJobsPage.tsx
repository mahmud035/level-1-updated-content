import React, { useContext, useEffect, useState } from 'react';
import {
  default as BackgroundImageOne,
  default as BackgroundImageTwo,
} from '../assets/images/bg1.png';
import AppliedJobCard from '../components/Job/AppliedJobCard';
import { JobContext } from '../contexts/JobContext';
import useExploreJobs from '../hooks/useExploreJobs';
import { IJob } from '../types';

export default function AppliedJobsPage() {
  const jobContext = useContext(JobContext);
  const exploreJobs = useExploreJobs();
  const [filteredJobs, setFilteredJobs] = useState<IJob[]>([]);

  useEffect(() => {
    if (jobContext) setFilteredJobs(jobContext.appliedJobs);
  }, [jobContext]);

  // Check for loading state based on jobContext availability
  if (!jobContext) return <div>Loading...</div>;

  const { appliedJobs } = jobContext;

  // Filter jobs based on selection
  const handleFilterJobs = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase();

    const filtered =
      value === 'alljobs'
        ? appliedJobs
        : appliedJobs.filter(
            (job) => job.remote_or_onsite.toLowerCase() === value
          );

    setFilteredJobs(filtered);
  };

  return (
    <section>
      <div className="relative h-72 bg-[#F9F9FF]">
        <img
          src={BackgroundImageOne}
          alt=""
          className="absolute bottom-0 left-0"
        />
        <img
          src={BackgroundImageTwo}
          alt=""
          className="absolute right-0 -top-28"
        />
        <h1 className="pt-24 text-3xl text-center">Applied Jobs</h1>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mr-4 mt-32 ml-auto max-w-fit bg-[#F4F4F4] rounded-lg">
          <select onChange={handleFilterJobs} className="select bg-[#F4F4F4]">
            <option value="alljobs">All Jobs</option>
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 pt-8 pb-32 mx-auto max-w-7xl">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <AppliedJobCard key={job.id} job={job} />)
        ) : (
          <div className="text-3xl text-center">
            You haven't applied for any job!&nbsp;
            <span
              onClick={exploreJobs}
              className="text-blue-500 underline cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && exploreJobs()}
            >
              Explore different jobs.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
