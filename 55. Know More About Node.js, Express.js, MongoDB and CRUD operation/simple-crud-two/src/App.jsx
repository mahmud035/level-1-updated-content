import { useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);

  // Fetch all users

  // Create or Update user

  // Edit user

  // Delete user

  // Fetch all users when component mounts

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">User Management</h1>

      <form className="p-4 mb-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      {/* Display list of users */}
      <div className="bg-white rounded shadow-md">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 border-b"
            >
              <div>
                <h3 className="font-semibold"></h3>
                <p className="text-sm text-gray-500"></p>
              </div>
              <div>
                <button className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-12 text-xl font-bold text-center">No User Found!</p>
        )}
      </div>
    </div>
  );
}
