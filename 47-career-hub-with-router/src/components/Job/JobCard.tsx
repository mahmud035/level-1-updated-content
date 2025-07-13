import { Link } from 'react-router-dom';
import LocationIcon from '../../assets/icons/Location.png';
import MoneyIcon from '../../assets/icons/money.png';
import { IJob } from '../../types';
import { getImageURL } from '../../utils';
import Button from '../ui/Button';

interface IJobCardProps {
  job: IJob;
}

export default function JobCard({ job }: IJobCardProps) {
  const {
    id,
    logo,
    job_title,
    company_name,
    location,
    salary,
    remote_or_onsite,
    job_type,
  } = job;

  return (
    <div className="p-8 font-light border rounded">
      <img src={getImageURL('logo', logo)} alt="" className="w-28" />

      <h3 className="py-2 text-2xl">{job_title}</h3>
      <p className="text-xl">{company_name}</p>

      <div className="flex gap-6 py-4">
        <button className="btn-secondary">{remote_or_onsite}</button>
        <button className="btn-secondary">{job_type}</button>
      </div>

      <div className="flex pb-5 gap-9">
        <div className="flex gap-2">
          <img src={LocationIcon} alt="" className="w-6" />
          <p>{location}</p>
        </div>

        <div className="flex gap-2">
          <img src={MoneyIcon} alt="" className="w-6" />
          <p>{salary}</p>
        </div>
      </div>

      <Link to={`jobs/${id}`}>
        <Button label="View Details" className="rounded" />
      </Link>
    </div>
  );
}
