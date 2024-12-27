import Lottie from 'lottie-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import loginAnimation from '../../assets/images/lottie/login.json';
import useAuth from '../../hooks/useAuth';
import { defaultLoginFormData } from '../../utils';

export default function LoginPage() {
  const [formData, setFormData] = useState(defaultLoginFormData);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(formData.email, formData.password)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        toast.error('Failed to login');
      });
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="max-w-2xl">
          <Lottie animationData={loginAnimation} loop autoPlay />
        </div>
        <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
          <h1 className="pt-4 mx-auto text-5xl font-bold">Login</h1>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <p className="text-sm">
                Don't have an account?&nbsp;
                <Link to="/register" className="text-blue-500 underline">
                  Register
                </Link>
              </p>
            </div>
            <div className="mt-6 form-control">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
