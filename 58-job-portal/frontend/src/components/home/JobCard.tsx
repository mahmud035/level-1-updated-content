import { FaDollarSign } from 'react-icons/fa6';
import { MdOutlineLocationOn } from 'react-icons/md';
import { Link } from 'react-router';
import { useGetJobApplicationsQuery } from '../../api/jobApplication/jobApplication.hooks';
import useAuth from '../../hooks/useAuth';
import { IJob } from '../../types/job';
import { IJobApplication } from '../../types/jobApplication';

interface IJobCardProps {
  job: IJob;
}

export default function JobCard({ job }: IJobCardProps) {
  const { user } = useAuth();

  const getJobApplicationsQuery = useGetJobApplicationsQuery(user?.email || '');
  const isJobPostedByUser = job?.hr_email === user?.email;
  const alreadyApplied = getJobApplicationsQuery?.data?.data?.find(
    (appliedJob: IJobApplication) => appliedJob._id === job._id
  );

  const {
    _id,
    title,
    description,
    company_logo,
    company,
    location,
    category,
    jobType,
    requirements,
    salaryRange: { min, max } = {},
  } = job || {};

  return (
    <div className="shadow-xl card card-compact bg-base-100">
      <div className="flex gap-3 p-4">
        <figure>
          <img src={company_logo} alt="" className="w-16" />
        </figure>
        <div>
          <h4 className="text-xl font-medium">{company}</h4>
          <p className="flex items-center gap-1">
            <MdOutlineLocationOn size={18} /> {location}
          </p>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {title} <span className="badge badge-secondary">NEW</span>
        </h2>
        <p>{description}</p>
        <div className="flex flex-wrap gap-2">
          {requirements?.map((skill) => (
            <p
              key={skill}
              className="bg-blue-100 p-0.5 rounded text-center hover:text-blue-300"
            >
              {skill}
            </p>
          ))}
        </div>
        <p className="flex items-center">Category: {category}</p>
        <p className="flex items-center">Job Type: {jobType}</p>
        <p className="flex items-center">
          Salary: &nbsp;
          <FaDollarSign />
          {min} - {max}
        </p>
        <div className="justify-end card-actions">
          {!isJobPostedByUser ? (
            alreadyApplied ? (
              <button className="px-4 py-2 font-medium text-white rounded cursor-not-allowed bg-violet-400">
                Already Applied
              </button>
            ) : (
              <Link to={`/jobs/${_id}`}>
                <button className="px-4 py-2 font-medium text-white rounded bg-violet-500 hover:bg-violet-700">
                  Apply
                </button>
              </Link>
            )
          ) : (
            <button className="px-4 py-2 font-medium text-white rounded cursor-not-allowed bg-violet-400">
              You Post This Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
