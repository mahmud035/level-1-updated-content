import { useContext, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { defaultRegisterFormData } from '../../utils';

export default function RegisterForm() {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState(defaultRegisterFormData);

  if (!authContext) return <h1>Loading...</h1>;

  const { createUser, googleSignIn } = authContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser(formData.email, formData.password)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));

    console.log(formData);
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-sm text-gray-600">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Register
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-1/2 py-2 text-lg border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <FaGoogle className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="flex items-center justify-center w-1/2 py-2 text-lg border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none">
            <FaGithub className="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
