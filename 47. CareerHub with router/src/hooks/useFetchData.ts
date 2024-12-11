import { useEffect, useState } from 'react';

export default function useFetchData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error fetching data');
      const data = await res.json();
      setData(data);
    };

    fetchData();
  }, [url]);

  return data;
}
