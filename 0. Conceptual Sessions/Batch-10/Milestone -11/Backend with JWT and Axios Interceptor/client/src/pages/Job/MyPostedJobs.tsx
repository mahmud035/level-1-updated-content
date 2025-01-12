import { useGetJobsByUserQuery } from '../../api/job/job.hooks';
import MyPostedJobCard from '../../components/Job/MyPostedJobCard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import { IJob } from '../../types/job';

const MyPostedJobs = () => {
  const { user } = useAuth();
  const getJobsByUserQuery = useGetJobsByUserQuery(user?.email ?? '');
  const { isPending, data } = getJobsByUserQuery;

  if (isPending) return <LoadingSpinner />;

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">My Posted Jobs</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {data?.data?.length ?? 0} {data?.data?.length <= 1 ? 'Job' : 'Jobs'}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              {data?.data?.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <span>Deadline</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Price Range</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Description
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.data?.map((job: IJob) => (
                      <MyPostedJobCard key={job._id} job={job} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-10 text-2xl font-medium w-full text-center">
                  You haven't post any job!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostedJobs;
