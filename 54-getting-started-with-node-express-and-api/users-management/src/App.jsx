import { useEffect, useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/users');
        if (!res.ok) throw new Error('Error fetching users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error', error);
      }
    };

    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error submitting the form');

      const data = await res.json();
      setUsers(data);
      setFormData({ name: '', email: '' }); // Reset form data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center flex-col gap-6 justify-center">
      {/* Form to add a new user */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-700">Add User</h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Display the list of users */}
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <p key={user.id} className="text-lg font-light">
              {user.id}. {user.name} {user.email}
            </p>
          ))
        ) : (
          <p>No User Found!</p>
        )}
      </div>
    </div>
  );
}
