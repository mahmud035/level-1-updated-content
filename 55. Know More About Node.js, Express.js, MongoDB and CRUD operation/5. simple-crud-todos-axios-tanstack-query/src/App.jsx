import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`);
      if (!res.ok) throw new Error('Error fetching users');
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('User updated successfully');
    } else {
      // Create
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('User created successfully');
    }

    setFormData({ name: '', email: '' });
    setEditingId(null);
    fetchUsers();
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, email: user.email });
  };

  // Delete user
  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    toast.success('User deleted successfully');
    fetchUsers();
  };

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Todo Management</h1>

      <form
        onSubmit={handleSubmit}
        className="p-4 mb-6 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
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
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {editingId ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      {/* Display list of users */}
      <div className="bg-white rounded shadow-md">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 border-b "
            >
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-12 text-xl font-bold text-center">No Todo Found!</p>
        )}
      </div>
    </div>
  );
}
