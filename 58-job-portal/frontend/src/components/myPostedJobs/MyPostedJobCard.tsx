import toast from 'react-hot-toast';
import { FaDollarSign } from 'react-icons/fa6';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useDeleteJobMutation } from '../../api/job/job.hooks';
import useAuth from '../../hooks/useAuth';
import { IJob } from '../../types/job';

interface IMyPostedJobCardProps {
  job: IJob;
}

export default function MyPostedJobCard({ job }: IMyPostedJobCardProps) {
  const {
    _id,
    title,
    description,
    company,
    location,
    requirements,
    salaryRange: { min, max } = {},
  } = job || {};
  const { user } = useAuth();
  const deleteJobMutation = useDeleteJobMutation();

  const handleDeleteJob = (jobId: string) => {
    if (!user?.email) return toast.error('Invalid Info');

    const jobInfo = { jobId, recruiterEmail: user?.email };

    deleteJobMutation.mutate(jobInfo, {
      onSuccess: () => toast.success('Job deleted successfully'),
    });
  };

  // NOTE: Interesting (Confirm before Deleting)
  const confirmDelete = (jobId: string) => {
    toast((t) => (
      <div className="flex items-center gap-2">
        <p>
          Are you <strong className="font-bold">sure?</strong>
        </p>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-white bg-red-400 rounded-md"
            onClick={() => {
              toast.dismiss(t.id); // dismiss toast
              handleDeleteJob(jobId); // Call the delete job function
            }}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 text-white bg-green-400 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="shadow-xl card card-compact bg-base-100">
      <div className="flex gap-3 p-4">
        <figure>
          <img
            src="https://i.ibb.co/MhsV6wz/microsoft.png"
            alt=""
            className="w-16"
          />
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
        <p className="flex items-center">
          Salary: &nbsp;
          <FaDollarSign />
          {min} - {max}
        </p>
        <p className="text-lg font-bold">
          Applications Count:&nbsp;
          {job?.applicationCount ?? 0}
        </p>
        <div className="justify-end gap-3 card-actions">
          <button className="px-4 py-2 font-medium text-white rounded bg-violet-500 hover:bg-violet-700">
            Update
          </button>

          <button
            onClick={() => confirmDelete(_id)}
            className="px-4 py-2 font-medium text-white rounded bg-violet-500 hover:bg-violet-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
