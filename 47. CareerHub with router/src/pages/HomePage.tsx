import { useContext, useRef } from 'react';
import Hero from '../components/Hero/Hero';
import JobCard from '../components/Job/JobCard';
import JobCategoryCard from '../components/Job/JobCategoryCard';
import Button from '../components/ui/Button';
import { JobContext } from '../contexts/JobContext';

export default function HomePage() {
  const jobContext = useContext(JobContext);
  const featuredJobsRef = useRef(null);

  if (!jobContext) return <div>Loading...</div>;

  const { jobs, jobCategories, showAllJobs, setShowAllJobs } = jobContext;

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F9F9FF]">
        <div className="px-4 mx-auto max-w-7xl">
          <Hero />
        </div>
      </section>

      {/* Job Category List */}
      <section className="px-4 pt-32 mx-auto font-light max-w-7xl">
        <h3 className="text-center text-5xl leading-[60px] text-[#1A1919]">
          Job Category List
        </h3>
        <p className="text-center leading-6 text-[#757575] pt-4 pb-8">
          Explore thousands of job opportunities with all the information you
          need. Its your future
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobCategories.map((category) => (
            <JobCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section
        className="px-4 py-32 mx-auto font-light max-w-7xl"
        id="featured-jobs"
        ref={featuredJobsRef}
      >
        <h3 className="text-center text-5xl leading-[60px] text-[#1A1919]">
          Featured Jobs
        </h3>
        <p className="text-center leading-6 text-[#757575] pt-4 pb-8">
          Explore thousands of job opportunities with all the information you
          need. Its your future
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {showAllJobs
            ? jobs.map((job) => <JobCard key={job.id} job={job} />)
            : jobs.slice(0, 4).map((job) => <JobCard key={job.id} job={job} />)}
        </div>

        {!showAllJobs && (
          <div className="flex justify-center pt-10">
            <Button
              label="See All Jobs"
              className="rounded-lg"
              onClick={() => setShowAllJobs(true)}
            />
          </div>
        )}
      </section>
    </main>
  );
}
