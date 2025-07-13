import React, { useState } from 'react';

export default function RegisterTwo() {
  // State to manage all form data
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Generalized event handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submitted:', data);
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-6 text-3xl font-semibold text-center">Register Two</h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white rounded bg-cyan-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}
