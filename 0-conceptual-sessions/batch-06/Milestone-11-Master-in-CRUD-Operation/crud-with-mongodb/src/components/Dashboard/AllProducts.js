import { useQuery } from '@tanstack/react-query';
import ProductTable from './ProductTable';
import { Table } from 'flowbite-react';
import { useState } from 'react';
import { useEffect } from 'react';

const AllProducts = () => {
  const [products2, setProducts2] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch Data Using useEffect() Hook
  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => setProducts2(data.data));
  }, [refresh]);

  // console.log(products2);

  //* NOTE: Fetch Data Using useQuery()
  const url = `http://localhost:5000/products`;
  const {
    isLoading,
    isError,
    data: products = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // console.log(products);

  return (
    <div className="w-full">
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {/* Data from useQuery() */}
          {products.map((product, index) => (
            <ProductTable key={index} product={product} refetch={refetch} />
          ))}

          {/* Data from useEffect() */}
          {/* {products2.map((product2, index) => (
            <ProductTable
              key={index}
              product2={product2}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))} */}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllProducts;
