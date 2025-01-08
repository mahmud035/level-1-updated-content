import { IJob } from '../../types/job';
import JobCard from '../home/JobCard';

interface IJobListProps {
  jobs: IJob[];
}

export default function JobList({ jobs }: IJobListProps) {
  return (
    <section id="featured-jobs" className="py-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {jobs?.map((job: IJob) => (
          <JobCard key={job?._id} job={job} />
        ))}
      </div>
    </section>
  );
}
