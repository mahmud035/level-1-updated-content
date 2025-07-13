import { Link } from 'react-router-dom';
import LocationIcon from '../../assets/icons/location2.png';
import MoneyIcon from '../../assets/icons/money.png';
import { IJob } from '../../types';
import { getImageURL } from '../../utils';
import Button from '../ui/Button';

interface IAppliedJobCard {
  job: IJob;
}

export default function AppliedJobCard({ job }: IAppliedJobCard) {
  const {
    id,
    logo,
    company_name,
    job_title,
    remote_or_onsite,
    job_type,
    location,
    salary,
  } = job;

  return (
    <div className="flex flex-col justify-between border rounded-lg md:items-center md:flex-row p-7">
      <div className="flex gap-8">
        <div className="bg-[#F4F4F4] hidden md:flex rounded-lg md:justify-center md:items-center md:w-48 lg:w-56 xl:w-60">
          <img src={getImageURL('logo', logo)} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl">{job_title}</h3>
          <h4 className="text-2xl text-[#757575]">{company_name}</h4>
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
              <p>Salary : {salary}</p>
            </div>
          </div>
        </div>
      </div>
      <Link to={`../jobs/${id}`}>
        <Button label="View Details" className="rounded" />
      </Link>
    </div>
  );
}
