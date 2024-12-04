import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
      if (!res.ok) throw new Error('Error fetching products');
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Create or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${editingId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      toast.success('Product updated successfully');
    } else {
      // Create
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('Product added successfully');
    }

    setFormData({ name: '', price: '' });
    setEditingId(null);
    fetchProducts();
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({ name: product.name, price: product.price });
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    toast.success('Product deleted successfully');
    fetchProducts();
  };

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold ">Product Management</h1>

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
          <label htmlFor="number" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Display list of users */}
      <div className="bg-white rounded shadow-md">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 border-b"
            >
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">Price: {product.price}$</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(product)}
                  className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-12 text-xl font-bold text-center">
            No Product Found!
          </p>
        )}
      </div>
    </div>
  );
}
