import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '' });
  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`);
      if (!res.ok) throw new Error('Error fetching posts');
      const data = await res.json();
      setPosts(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Create or Update post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('Post updated successfully');
    } else {
      // Create
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('Post created successfully');
    }

    setFormData({ title: '' });
    setEditingId(null);
    fetchPosts();
  };

  // Edit post
  const handleEdit = (post) => {
    setEditingId(post._id);
    setFormData({ title: post.title });
  };

  // Delete post
  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    toast.success('Post deleted successfully');
    fetchPosts();
  };

  // Fetch all posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Post Management</h1>

      <form
        onSubmit={handleSubmit}
        className="p-4 mb-6 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {editingId ? 'Update Post' : 'Add Post'}
        </button>
      </form>

      {/* Display list of users */}
      <div className="bg-white rounded shadow-md">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center justify-between p-4 border-b "
            >
              <div>
                <h3 className="font-semibold">{post.title}</h3>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(post)}
                  className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-12 text-xl font-bold text-center">No Post Found!</p>
        )}
      </div>
    </div>
  );
}
