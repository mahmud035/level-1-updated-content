import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import JobTitleIcon from '../assets/icons/calendar.png';
import EmailIcon from '../assets/icons/email.png';
import LocationIcon from '../assets/icons/location2.png';
import MoneyIcon from '../assets/icons/money.png';
import PhoneIcon from '../assets/icons/phone.png';
import BackgroundImageOne from '../assets/images/bg1.png';
import BackgroundImageTwo from '../assets/images/bg2.png';
import Button from '../components/ui/Button';
import { JobContext } from '../contexts/JobContext';
import { IJob } from '../types';
import { saveAppliedJobs } from '../utils';

export default function JobDetailsPage() {
  const jobContext = useContext(JobContext);
  const { id } = useParams<{ id: string }>();

  // Handle loading and missing id states
  if (!jobContext || !id)
    return <div className="py-32 text-center">Loading...</div>;

  const { jobs, appliedJobs, setAppliedJobs } = jobContext;
  const job = jobs.find((job) => job.id === parseInt(id));

  // Handle case where no job is found
  if (!job) return <div className="py-32 text-center">No Job Found</div>;

  const {
    job_description,
    job_responsibility,
    educational_requirements,
    experiences,
    salary,
    job_title,
    contact_information: { address, email, phone },
  } = job as IJob;

  const handleAppliedJobs = (job: IJob) => {
    const jobAlreadyExist = appliedJobs.some(
      (appliedJob: IJob) => appliedJob.id === job.id
    );

    // Update applied jobs state
    if (!jobAlreadyExist) {
      setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, job]);
    }

    // Save applied jobs to local storage
    saveAppliedJobs(job);
  };

  return (
    <section>
      <div className="relative h-72 bg-[#F9F9FF]">
        <img
          src={BackgroundImageOne}
          alt=""
          className="absolute bottom-0 left-0"
        />
        <img
          src={BackgroundImageTwo}
          alt=""
          className="absolute right-0 -top-28"
        />
        <h1 className="pt-24 text-3xl text-center">Job Details</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 px-4 py-32 mx-auto lg:grid-cols-3 max-w-7xl">
        {/* Left Side */}
        <div className="flex flex-col order-2 gap-6 leading-8 lg:col-span-2 lg:order-1">
          <p>
            <span className="font-medium">Job Description: </span>
            {job_description}
          </p>
          <p>
            <span className="font-medium">Job Responsibility: </span>
            {job_responsibility}
          </p>
          <p>
            <span className="font-medium">Educational Requirements: </span>
            <br />
            {educational_requirements}
          </p>
          <p>
            <span className="font-medium">Experiences: </span> <br />
            {experiences}
          </p>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1 lg:order-2">
          <div className="p-7 rounded-lg bg-gradient-to-r from-[rgba(126,144,254,0.1)] to-[rgba(152,115,255,0.1)]">
            <h3 className="font-medium">Job Details</h3>

            <div className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] h-[1px] my-5"></div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <img src={MoneyIcon} alt="" className="w-6" />
                <p>
                  <span className="text-[#474747]">Salary : </span>
                  <span className="text-[#757575]">{salary}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <img src={JobTitleIcon} alt="" className="w-6" />
                <p>
                  <span className="text-[#474747]">Job Title : </span>
                  <span className="text-[#757575]">{job_title}</span>
                </p>
              </div>
            </div>

            <h3 className="pt-8 font-medium">Contact Information</h3>

            <div className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] h-[1px] my-5"></div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <img src={PhoneIcon} alt="" className="w-6" />
                <p>
                  <span className="text-[#474747]">Phone : </span>
                  <span className="text-[#757575]">{phone}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <img src={EmailIcon} alt="" className="w-6" />
                <p>
                  <span className="text-[#474747]">Email : </span>
                  <span className="text-[#757575]">{email}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <img src={LocationIcon} alt="" className="w-6" />
                <p>
                  <span className="text-[#474747]">Address : </span>
                  <span className="text-[#757575]">{address}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <Button
              label="Apply Now"
              className="w-full rounded-lg"
              onClick={() => handleAppliedJobs(job)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
