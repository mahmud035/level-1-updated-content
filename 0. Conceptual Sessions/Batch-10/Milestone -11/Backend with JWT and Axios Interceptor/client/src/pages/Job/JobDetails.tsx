import { format, isPast } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { useGetJobQuery } from '../../api/job/job.hooks';
import {
  useGetJobBidsByUserQuery,
  useSaveJobBidMutation,
} from '../../api/jobBid/jobBid.hooks';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import { IJob } from '../../types/job';
import { IJobBid, ISaveJobBid } from '../../types/jobBid';
import validateJobBidForm from '../../utils/validateJobBidForm';

const JobDetails = () => {
  const { user } = useAuth();
  const { id: jobId } = useParams();
  const getJobQuery = useGetJobQuery(jobId!);
  const { isPending, data } = getJobQuery;
  const getJobBidsByUserQuery = useGetJobBidsByUserQuery(user?.email ?? '');
  const saveJobBidMutation = useSaveJobBidMutation();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [formData, setFormData] = useState({ bidAmount: 0, bidderComment: '' });

  if (isPending) return <LoadingSpinner />;

  const {
    _id,
    title,
    jobOwnerInfo,
    description,
    category,
    minimumPrice,
    maximumPrice,
    deadline,
  }: IJob = data?.data || {};

  const isJobPostedByUser = jobOwnerInfo?.email === user?.email;
  const alreadyPlacedABid = getJobBidsByUserQuery?.data?.data?.find(
    (jobBid: IJobBid) => jobBid.jobId === _id
  );
  const isJobDeadlinePassed = isPast(new Date(deadline));

  // Get Form Data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('bidAmount') ? Number(value) : value,
    }));
  };

  // Place Job Bid
  const handlePlaceJobBid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate Inputs
    const validation = validateJobBidForm(
      formData,
      startDate,
      deadline,
      minimumPrice
    );
    if (!validation.isValid) return toast.error(validation.errorMessage!);

    // Create Bid Data
    const data: ISaveJobBid = {
      jobId: _id,
      jobTitle: title,
      jobCategory: category,
      ...formData,
      bidDeadline: startDate!.toISOString(),
      bidderEmail: user?.email ?? '',
      jobOwnerEmail: jobOwnerInfo?.email,
    };

    // Submit the bid
    saveJobBidMutation.mutate(data, {
      onSuccess: () => {
        toast.success(`Successfully placed a bid for '${title}'.`);
        navigate('/my-bids');
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-light text-gray-800`}>
            {/* Deadline: {new Date(deadline).toLocaleDateString()} */}
            Deadline: {format(new Date(deadline), 'MM/dd/yyyy')}
            {isJobDeadlinePassed && (
              <span className="ml-2 text-white indicator-item badge badge-error">
                Deadline Passed
              </span>
            )}
          </span>

          <span
            className={`px-3 py-1 text-[8px] uppercase text-xs bg-blue-200/60 ${
              category === 'Web Development' && 'text-blue-500'
            } ${category === 'Graphics Design' && 'text-green-500'} ${
              category === 'Digital Marketing' && 'text-red-500'
            } rounded-full `}
          >
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm text-gray-600">
                Name: {jobOwnerInfo?.name}
              </p>
              <p className="mt-2 text-sm text-gray-600 ">
                Email: {jobOwnerInfo?.email}
              </p>
            </div>
            <div className="object-cover overflow-hidden rounded-full w-14 h-14">
              <img src={jobOwnerInfo?.photoURL ?? ''} alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${minimumPrice} - ${maximumPrice}
          </p>
        </div>
      </div>

      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handlePlaceJobBid}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Bid Amount
              </label>
              <input
                type="number"
                name="bidAmount"
                onChange={handleChange}
                id="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                min={1}
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email ?? ''}
                disabled
                id="emailAddress"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                type="text"
                name="bidderComment"
                value={formData.bidderComment}
                onChange={handleChange}
                id="comment"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="p-2 border rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={
                isJobPostedByUser || alreadyPlacedABid || isJobDeadlinePassed
              }
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {!isJobPostedByUser
                ? alreadyPlacedABid
                  ? 'Already Placed A Bid'
                  : 'Place Bid'
                : 'You Posted This Job'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
