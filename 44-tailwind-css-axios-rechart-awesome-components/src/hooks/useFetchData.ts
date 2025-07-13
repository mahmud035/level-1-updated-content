import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFetchData<T>(
  url: string
): [T[], (data: T[]) => void] {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url); // Fetch data using `axios`
        if (res.statusText !== 'OK') throw new Error(`${res.statusText}`);
        setData(res.data.products);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [url]);

  return [data, setData];
}
