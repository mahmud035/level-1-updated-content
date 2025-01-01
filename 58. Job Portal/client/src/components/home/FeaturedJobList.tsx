import { useGetJobsQuery } from '../../api/job/job.hooks';
import { IJob } from '../../types/job';
import FeaturedJobCard from './FeaturedJobCard';

export default function FeaturedJobList() {
  const getJobsQuery = useGetJobsQuery();
  const { isPending, isError, error, data } = getJobsQuery;

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section>
      <div>
        <h3>Jobs of the day</h3>
        <p>Search and connect withe the right candidates faster</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data.data.map((job: IJob) => (
          <FeaturedJobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}
