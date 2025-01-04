import { useGetJobsQuery } from '../../api/job/job.hooks';
import { IJob } from '../../types/job';
import Loading from '../shared/Loading';
import FeaturedJobCard from './FeaturedJobCard';

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
          <FeaturedJobCard key={job?._id} job={job} />
        ))}
      </div>
    </section>
  );
}
