import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/users');
      if (!res.ok) throw new Error('Error fetching users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error(error.message);
      console.error('Error:', error);
    }
  };

  // Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update
      await fetch(`http://localhost:5000/users/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('User updated successfully');
    } else {
      // Create
      await fetch('http://localhost:5000/users', {
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
    await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
    toast.success('User deleted successfully');
    fetchUsers();
  };

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 bg-white shadow-md rounded"
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
            className="w-full mt-1 p-2 border rounded"
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
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingId ? 'Update User' : 'Add User'}
        </button>
      </form>

      {/* Display list of users */}
      <div className="bg-white shadow-md rounded">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="p-4 flex justify-between items-center border-b
          "
            >
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center p-10 font-bold text-xl">No User Found!</p>
        )}
      </div>
    </div>
  );
}
