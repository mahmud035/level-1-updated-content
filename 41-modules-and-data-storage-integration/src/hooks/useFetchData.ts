import { useEffect, useState } from 'react';

export default function useFetchData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response was NOT ok');
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [url]);

  return data;
}
