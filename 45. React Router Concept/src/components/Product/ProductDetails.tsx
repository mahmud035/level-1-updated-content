import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ILoaderData } from '../../types';

const ProductDetails = () => {
  const { product } = useLoaderData() as ILoaderData;
  const navigate = useNavigate();

  const {
    title,
    description,
    category,
    price,
    rating,
    stock,
    tags,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    images,
  } = product;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="pb-12">
      <h2 className="py-6 text-3xl font-semibold text-center text-white">
        Product Details
      </h2>

      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm my-4 bg-cyan-800"
      >
        Go Back
      </button>

      <div className="card lg:card-side lg:flex bg-base-100 shadow-xl">
        <figure className="lg:w-1/2 w-full h-1/2 flex items-stretch">
          <img
            src={images[0]}
            alt={title}
            className="object-cover w-full h-full object-center rounded-sm"
          />
        </figure>
        <div className="card-body lg:w-1/2 w-full h-1/2 lg:pt-0 flex items-stretch">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium card-title">Name: {title}</h2>
            <p>Category: {category}</p>
            <p>Price: {price}</p>
            <p>Description: {description}</p>
            <p>Rating: {rating}</p>
            <p>Availability: {availabilityStatus}</p>
            <p>Stock: {stock}</p>
            <p>Warranty: {warrantyInformation}</p>
            <p>Shipping information: {shippingInformation}</p>
            <p>Return policy: {returnPolicy}</p>
            <p>Shipping information: {shippingInformation}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 bg-gray-800 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
