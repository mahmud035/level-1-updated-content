import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function useFetchCoffees<T>() {
  const [coffees, setCoffees] = useState<T[]>([]);

  // Fetch all coffees
  const fetchCoffees = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/coffees`);
      if (!res.ok) throw new Error('Error fetching coffees');
      const data = await res.json();
      setCoffees(data.data);
      // setCoffees(data); // TODO: 👈 Uncomment this if use backend-server folder for server
    } catch (error) {
      Swal.fire({
        title: { error },
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  return { coffees, fetchCoffees };
}
