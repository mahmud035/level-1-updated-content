import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useCreateJobMutation } from '../../api/job/job.hooks';
import useAuth from '../../hooks/useAuth';
import { IAddJob } from '../../types/job';
import { getDefaultAddJobFormData } from '../../utils';

export default function AddJobPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<IAddJob>(
    getDefaultAddJobFormData(user?.email ?? '')
  );
  const createJobMutation = useCreateJobMutation();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes('salaryRange')) {
      const key = name.split('.')[1];

      setFormData((prev) => ({
        ...prev,
        salaryRange: {
          ...prev.salaryRange,
          [key]: Number(value),
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: 'requirements' | 'responsibilities'
  ) => {
    const values = e.target.value.split(',').map((item) => item.trim());
    setFormData({ ...formData, [key]: values });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createJobMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Job created successfully');
        navigate('/my-posted-jobs');
      },
    });
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Create Job Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter job title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter category"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Salary Range (BDT)</label>
          <div className="flex space-x-4">
            <input
              type="number"
              name="salaryRange.min"
              value={formData.salaryRange.min}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Min"
              min={0}
            />
            <input
              type="number"
              name="salaryRange.max"
              value={formData.salaryRange.max}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Max"
              min={0}
              max={5000000}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Requirements (comma-separated)
          </label>
          <input
            type="text"
            value={formData.requirements.join(', ')}
            onChange={(e) => handleArrayChange(e, 'requirements')}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Responsibilities (comma-separated)
          </label>
          <input
            type="text"
            value={formData.responsibilities.join(', ')}
            onChange={(e) => handleArrayChange(e, 'responsibilities')}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., Develop software, Collaborate with team"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter job description"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">HR Name</label>
          <input
            type="text"
            name="hr_name"
            value={formData.hr_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter HR name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">HR Email</label>
          <input
            type="email"
            name="hr_email"
            defaultValue={formData.hr_email}
            disabled
            className="w-full p-2 border border-gray-300 rounded cursor-not-allowed"
            placeholder="Enter HR email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter logo URL"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Company Logo URL</label>
          <input
            type="url"
            name="company_logo"
            value={formData.company_logo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter logo URL"
          />
        </div>

        <button
          type="submit"
          disabled={createJobMutation.isPending}
          className="w-full px-4 py-2 text-white rounded bg-violet-500 hover:bg-violet-600"
        >
          {createJobMutation.isPending ? (
            <p className="flex items-center gap-1.5">
              <span className="loading loading-spinner loading-xs"></span>
              <span>Saving</span>
            </p>
          ) : (
            'Save'
          )}
        </button>
      </form>
    </div>
  );
}
