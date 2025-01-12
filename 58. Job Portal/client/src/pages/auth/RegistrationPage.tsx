import Lottie from 'lottie-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { useGenerateTokensMutation } from '../../api/auth/auth.hooks';
import registerAnimation from '../../assets/images/lottie/register.json';
import useAuth from '../../hooks/useAuth';
import { defaultRegistrationFormData } from '../../utils';

export default function RegistrationPage() {
  const [formData, setFormData] = useState(defaultRegistrationFormData);
  const { createUser, loginWithGoogle } = useAuth();
  const generateTokensMutation = useGenerateTokensMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createUser(formData.email, formData.password)
      .then((userCredential) => {
        toast.success('User created successfully');

        //* Generate accessToken & refreshToken
        const user = { email: userCredential.user?.email || '' };
        generateTokensMutation.mutate(user);

        navigate('/');
      })
      .catch(() => {
        toast.error('Failed to create user');
      });
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle()
      .then((userCredential) => {
        toast.success('Signin Successful');

        //* Generate accessToken & refreshToken
        const user = { email: userCredential.user?.email || '' };
        generateTokensMutation.mutate(user);

        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
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
          <div className="px-8 pb-8">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-3 py-3 text-sm font-medium duration-150 border rounded-lg hover:bg-gray-50 active:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
