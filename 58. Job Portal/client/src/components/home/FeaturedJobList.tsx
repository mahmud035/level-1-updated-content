import { Link } from 'react-router';
import { useGetJobsQuery } from '../../api/job/job.hooks';
import { IJob } from '../../types/job';
import Loading from '../shared/Loading';
import JobCard from './JobCard';

export default function FeaturedJobList() {
  const getJobsQuery = useGetJobsQuery();
  const { isPending, data } = getJobsQuery;

  if (isPending) return <Loading />;

  return (
    <section id="featured-jobs" className="py-24">
      <div>
        <h3 className="text-center text-5xl leading-[60px] text-[#1A1919]">
          Jobs of the day
        </h3>
        <p className="text-center leading-6 text-[#757575] pt-4 pb-8">
          Search and connect withe the right candidates faster
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.data?.map((job: IJob) => (
          <JobCard key={job?._id} job={job} />
        ))}
      </div>

      <div className="flex items-center justify-center w-full pt-14">
        <Link
          to={`/all-jobs`}
          className="px-4 py-2 font-medium text-white rounded bg-violet-500 hover:bg-violet-700"
        >
          <button>See All Jobs</button>
        </Link>
      </div>
    </section>
  );
}
