import { FaDollarSign } from 'react-icons/fa6';
import { MdOutlineLocationOn } from 'react-icons/md';
import { Link } from 'react-router';
import { IJob } from '../../types/job';

interface IJobDetailsCardProps {
  job: IJob;
}

export default function JobDetailsCard({ job }: IJobDetailsCardProps) {
  const {
    _id,
    title,
    description,
    jobType,
    category,
    applicationDeadline,
    company_logo,
    company,
    location,
    requirements,
    responsibilities,
    salaryRange: { min, max },
  } = job;

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
          {requirements.map((skill: string) => (
            <p
              key={skill}
              className="bg-blue-100 p-0.5 rounded text-center hover:text-blue-300"
            >
              {skill}
            </p>
          ))}
        </div>
        <p>Responsibilities: </p>
        <ul className="flex flex-col gap-2">
          {responsibilities.map((responsibility: string) => (
            <li key={responsibility}>* {responsibility}</li>
          ))}
        </ul>
        <p className="flex items-center">
          Salary: &nbsp;
          <FaDollarSign />
          {min} - {max}
        </p>
        <p>Job Type: {jobType}</p>
        <p>Category: {category}</p>
        <p>Deadline: {applicationDeadline}</p>
        <div className="card-actions">
          <Link to={`/jobs/${_id}`} className="w-full">
            <button className="w-full px-4 py-2 font-medium text-white rounded bg-violet-500 hover:bg-violet-700">
              Apply
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
