import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useCreateJobMutation } from '../../api/job/job.hooks';
import useAuth from '../../hooks/useAuth';
import useJobOwner from '../../hooks/useJobOwner';
import { ICreateJob } from '../../types/job';
import { getDefaultAddJobFormData } from '../../utils';
import { validateJobForm } from '../../utils/validateJobForm';

const AddJob = () => {
  const { user } = useAuth();
  const jobOwnerInfo = useJobOwner();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [formData, setFormData] = useState(getDefaultAddJobFormData);
  const createJobMutation = useCreateJobMutation();
  const navigate = useNavigate();

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

  // Add Job
  const handleAddJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate Inputs
    const validation = validateJobForm(formData, startDate);
    if (!validation.isValid) return toast.error(validation.errorMessage!);

    // Create Job Data
    const data: ICreateJob = {
      jobOwnerInfo,
      ...formData,
      deadline: startDate!.toISOString(),
    };

    // Submit Job Data
    createJobMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Job added successfully');
        navigate('/my-posted-jobs');
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 mx-auto bg-white rounded-md shadow-md md:p-6">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Post a Job
        </h2>

        <form onSubmit={handleAddJob}>
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
                required
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                disabled
                defaultValue={user?.email ?? ''}
                id="emailAddress"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring disabled:cursor-not-allowed"
                required
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                name="deadline"
                // value={startDate!.toLocaleDateString()?.slice(0, 10)}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="p-2 border rounded-md"
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
                onChange={handleChange}
                id="category"
                className="p-2 border rounded-md"
                required
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
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
