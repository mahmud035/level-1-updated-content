import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const navigate = useNavigate();

  const productData = useLoaderData();
  const product = productData.data;
  // console.log(product);
  const { image, name, price, _id } = product;

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const product = {
      name: e.target.name.value,
      price: parseInt(e.target.price.value),
      image: e.target.image.value,
    };

    // console.log(product);
    updateProduct(product);
  };

  //! NOTE: Update product data using "async...await" function.
  const updateProduct = async (product) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${_id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      // console.log(data);

      if (data.success) {
        toast.success(data.message);

        navigate('/dashboard/products');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {' '}
      <div className="py-32 px-10 min-h-screen w-full">
        <div className="bg-white p-10 md:w-3/4 lg:w-1/2 mx-auto">
          <form onSubmit={handleUpdateProduct}>
            <div className="flex items-center mb-5">
              <label className="inline-block w-40 mr-6 text-right font-bold text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={name}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
              />
            </div>

            <div className="flex items-center mb-5">
              <label className="inline-block w-40 mr-6 text-right font-bold text-gray-600">
                Price
              </label>
              <input
                type="text"
                name="price"
                placeholder="price"
                defaultValue={price}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
              />
            </div>

            <div className="flex items-center  mb-10">
              <label className="inline-block w-40 mr-6 text-right font-bold text-gray-600">
                Image
              </label>
              <input
                type="text"
                name="image"
                placeholder="url"
                defaultValue={image}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
              />
              <img
                src={image}
                className="ml-10 w-32 h-24 object-cover rounded-lg"
                alt=""
              />
            </div>

            <div className="text-right">
              <button className="py-3 px-8 bg-green-400 text-white font-bold rounded-lg">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
