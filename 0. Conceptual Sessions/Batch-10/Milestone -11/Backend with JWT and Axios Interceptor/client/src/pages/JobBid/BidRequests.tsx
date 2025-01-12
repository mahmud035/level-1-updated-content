import { useGetAllJobBidsForOwnerQuery } from '../../api/jobBid/jobBid.hooks';
import BidRequestCard from '../../components/JobBid/BidRequestCard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import { IJobBid } from '../../types/jobBid';

const BidRequests = () => {
  const { user } = useAuth();
  const getAllJobBidsForOwnerQuery = useGetAllJobBidsForOwnerQuery(
    user?.email ?? ''
  );
  const { isPending, data } = getAllJobBidsForOwnerQuery;

  if (isPending) return <LoadingSpinner />;

  return (
    <section className="container px-4 mx-auto my-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Bid Requests</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {data?.data?.length ?? 0}&nbsp;
          {data?.data?.length <= 1 ? 'Request' : 'Requests'}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
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
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Email</span>
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
                          <span>Price</span>
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
                        Status
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {data?.data?.map((jobBid: IJobBid) => (
                      <BidRequestCard key={jobBid._id} jobBid={jobBid} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="w-full py-10 text-2xl font-medium text-center">
                  No bid requests found!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BidRequests;
