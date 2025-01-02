import Lottie from 'lottie-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import jobApplyAnimation from '../../assets/images/lottie/jobApply.json';
import useAuth from '../../hooks/useAuth';
import { defaultJobApplyFormData } from '../../utils';

export default function JobApplyPage() {
  const [formData, setFormData] = useState(defaultJobApplyFormData);
  const { id } = useParams();
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ ...formData, jobId: id, userEmail: user?.email });
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="max-w-2xl">
          <Lottie animationData={jobApplyAnimation} loop autoPlay />
        </div>
        <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
          <h1 className="pt-4 mx-auto text-5xl font-bold">Apply Job</h1>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">LinkedIn URL</span>
              </label>
              <input
                type="url"
                name="linkedInURL"
                value={formData.linkedInURL}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Github URL</span>
              </label>
              <input
                type="url"
                name="githubURL"
                value={formData.githubURL}
                onChange={handleChange}
                placeholder="Github URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Resume URL</span>
              </label>
              <input
                type="url"
                name="resumeURL"
                value={formData.resumeURL}
                onChange={handleChange}
                placeholder="Resume URL"
                className="input input-bordered"
                required
              />
            </div>

            <div className="mt-6 form-control">
              <button className="w-full px-4 py-2.5 font-medium text-white rounded bg-violet-500 hover:bg-violet-700">
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
