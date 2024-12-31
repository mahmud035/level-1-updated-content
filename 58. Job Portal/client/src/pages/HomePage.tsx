import { useGetJobQuery, useGetJobsQuery } from '../api/job/job.hooks';
import Banner from '../components/home/Banner';

export default function HomePage() {
  const getJobsQuery = useGetJobsQuery();
  const getJobQuery = useGetJobQuery('67669491fc2bb5abfaef035b');
  console.log('getJobsQuery', getJobsQuery);
  console.log('getJobQuery', getJobQuery);

  return (
    <div>
      <Banner />
    </div>
  );
}
