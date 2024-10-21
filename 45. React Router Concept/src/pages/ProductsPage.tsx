import { useLoaderData } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import { ILoaderData, IProduct } from '../types';

export default function ProductsPage() {
  const { products } = useLoaderData() as ILoaderData;

  return (
    <>
      <h2 className="py-6 text-3xl font-semibold text-center text-white">
        Product List
      </h2>

      <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
