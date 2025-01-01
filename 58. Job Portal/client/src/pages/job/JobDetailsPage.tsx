import { useParams } from 'react-router';
import { useGetJobQuery } from '../../api/job/job.hooks';
import JobDetailsCard from '../../components/jobDetails/JobDetailsCard';
import Loading from '../../components/shared/Loading';

export default function JobDetailsPage() {
  const { id } = useParams();
  const getJobQuery = useGetJobQuery(id!);
  const { isPending, isError, error, data } = getJobQuery;

  if (isPending) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

  return <JobDetailsCard job={data.data} />;
}
