import { useGetRecruiterJobsQuery } from '../../api/job/job.hooks';
import MyPostedJobCard from '../../components/myPostedJobs/MyPostedJobCard';
import Loading from '../../components/shared/Loading';
import useAuth from '../../hooks/useAuth';
import { IJob } from '../../types/job';

export default function MyPostedJobPage() {
  const { user } = useAuth();
  const getRecruiterJobsQuery = useGetRecruiterJobsQuery(user?.email || '');
  const { isPending, data } = getRecruiterJobsQuery;

  if (isPending) return <Loading />;

  return (
    <section id="featured-jobs" className="py-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.data?.length > 0 ? (
          data?.data?.map((job: IJob) => (
            <MyPostedJobCard key={job?._id} job={job} />
          ))
        ) : (
          <p className="col-span-4 py-12 text-2xl text-center">
            You haven' post any jobs.
          </p>
        )}
      </div>
    </section>
  );
}
