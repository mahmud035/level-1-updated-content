import { useParams } from 'react-router';
import { useGetJobQuery } from '../../api/job/job.hooks';
import JobDetailsCard from '../../components/jobDetails/JobDetailsCard';

export default function JobDetailsPage() {
  const { id } = useParams();
  const getJobQuery = useGetJobQuery(id!);
  const { data } = getJobQuery;

  return <JobDetailsCard job={data.data} />;
}
