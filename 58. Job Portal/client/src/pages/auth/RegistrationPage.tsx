import Lottie from 'lottie-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import registerAnimation from '../../assets/images/lottie/register.json';
import useAuth from '../../hooks/useAuth';
import { defaultRegistrationFormData } from '../../utils';

export default function RegistrationPage() {
  const [formData, setFormData] = useState(defaultRegistrationFormData);
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(formData.email, formData.password)
      .then(() => {
        toast.success('User created successfully');
        navigate('/');
      })
      .catch(() => {
        toast.error('Failed to create user');
      });
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="max-w-2xl">
          <Lottie animationData={registerAnimation} loop autoPlay />
        </div>
        <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
          <h1 className="pt-4 mx-auto text-5xl font-bold">Register</h1>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
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
                Already have an account?&nbsp;
                <Link to="/login" className="text-blue-500 underline">
                  Login
                </Link>
              </p>
            </div>

            <div className="mt-6 form-control">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
