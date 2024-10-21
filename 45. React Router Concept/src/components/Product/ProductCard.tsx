import { Link } from 'react-router-dom';
import { IProduct } from '../../types';

interface IProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProductCardProps) {
  const { id, title, price, availabilityStatus, stock, category, thumbnail } =
    product;

  return (
    <div className="w-full h-[430px] shadow-xl card bg-base-100">
      <img src={thumbnail} alt={title} className="w-full h-48" />

      <div className="p-5 card-body">
        <h2 className="text-xl font-medium card-title">Name: {title}</h2>
        <p>Category: {category}$</p>
        <p>Price: {price}$</p>
        <p>Status: {availabilityStatus}</p>
        <p>Stock: {stock}</p>
        <div className="flex gap-4">
          <button className="btn btn-sm flex-1">Purchase</button>
          <Link to={`${id}`} className="btn btn-sm flex-1">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
}
