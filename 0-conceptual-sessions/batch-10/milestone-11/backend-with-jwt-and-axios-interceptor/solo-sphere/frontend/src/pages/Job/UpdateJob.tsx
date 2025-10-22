import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { useGetJobQuery, useUpdateJobMutation } from '../../api/job/job.hooks';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import { IUpdateJob } from '../../types/job';
import { getDefaultUpdateJobFormData } from '../../utils';
import { validateJobForm } from '../../utils/validateJobForm';

const UpdateJob = () => {
  const { user } = useAuth();
  const { id: jobId } = useParams();
  const getJobQuery = useGetJobQuery(jobId!);
  const { isPending, data } = getJobQuery;
  const updateJobMutation = useUpdateJobMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    getDefaultUpdateJobFormData(data?.data ?? {})
  );
  const [startDate, setStartDate] = useState<Date | null>(data?.data?.deadline);

  // Synchronize form data and deadline date with the fetched job data.
  // This ensures the form is pre-filled with the job's details when the data is available.
  useEffect(() => {
    if (data?.data) {
      setFormData(getDefaultUpdateJobFormData(data?.data)); // Populate the form fields
      if (data?.data?.deadline) setStartDate(new Date(data?.data?.deadline)); // Set the deadline date
    }
  }, [data?.data]);

  if (isPending) return <LoadingSpinner />;

  // Get Form Data
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('Price') ? Number(value) : value,
    }));
  };

  // Update Job
  const handleUpdateJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate Inputs
    const validation = validateJobForm(formData, startDate);
    if (!validation.isValid) return toast.error(validation.errorMessage!);

    const { _id, ...restFormData } = formData;

    // Create Updated Job Data
    const data: IUpdateJob = {
      jobId: _id,
      jobOwnerEmail: user?.email ?? '',
      jobData: {
        ...restFormData,
        deadline: startDate!.toISOString(),
      },
    };

    // Submit Updated Job Data
    updateJobMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Job updated successfully');
        navigate('/my-posted-jobs');
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 mx-auto bg-white rounded-md shadow-md md:p-6">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Job
        </h2>

        <form onSubmit={handleUpdateJob}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                id="job_title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                disabled
                defaultValue={user?.email ?? ''}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              <DatePicker
                className="p-2 border rounded-md"
                // value={startDate!.toLocaleDateString()?.slice(0, 10)}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                disabled
                id="category"
                className="p-2 border rounded-md disabled:cursor-not-allowed"
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="min_price">
                Minimum Price
              </label>
              <input
                type="number"
                name="minimumPrice"
                value={formData.minimumPrice}
                onChange={handleChange}
                id="min_price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                required
                min={1}
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="max_price">
                Maximum Price
              </label>
              <input
                type="number"
                name="maximumPrice"
                value={formData.maximumPrice}
                onChange={handleChange}
                id="max_price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                required
                min={1}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              id="description"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              required
              cols={30}
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button
              disabled={updateJobMutation.isPending}
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300  bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              {updateJobMutation.isPending ? (
                <p className="flex items-center gap-1.5">
                  <span className="loading loading-spinner loading-xs"></span>
                  <span>Saving</span>
                </p>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
