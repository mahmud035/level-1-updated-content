import toast from 'react-hot-toast';
import {
  useDeleteJobApplicationMutation,
  useGetJobApplicationsQuery,
} from '../../api/jobApplication/jobApplication.hooks';
import Loading from '../../components/shared/Loading';
import useAuth from '../../hooks/useAuth';
import useScroll from '../../hooks/useScroll';
import { IJobApplication } from '../../types/jobApplication';

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const handleScroll = useScroll('/', 'featured-jobs');
  const getJobApplicationsQuery = useGetJobApplicationsQuery(user?.email || '');
  const { isPending, data } = getJobApplicationsQuery;
  const deleteJobApplicationMutation = useDeleteJobApplicationMutation();

  if (isPending) return <Loading />;

  const handleDeleteJobApplication = (jobId: string) => {
    if (!user?.email) return toast.error('Invalid Info');

    const jobInfo = { jobId, applicantEmail: user?.email };

    deleteJobApplicationMutation.mutate(jobInfo, {
      onSuccess: () => toast.success('Job application deleted successfully'),
    });
  };

  return (
    <div className="overflow-x-auto">
      {data?.data?.length > 0 ? (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data?.map((application: IJobApplication) => (
              <tr key={application._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 mask">
                        <img
                          src={application.company_logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{application.company}</div>
                      <div className="text-sm opacity-50">
                        {application.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{application.title}</td>
                <th>
                  <button
                    onClick={() => handleDeleteJobApplication(application._id)}
                    className="text-white btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="py-12 text-2xl text-center">
          You haven' applied for any jobs.&nbsp;
          <button onClick={handleScroll} className="text-blue-500 underline">
            See Jobs Here
          </button>
        </p>
      )}
    </div>
  );
}
