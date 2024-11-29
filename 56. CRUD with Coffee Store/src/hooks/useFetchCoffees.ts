import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../utils';

export default function useFetchCoffees<T>() {
  const [coffees, setCoffees] = useState<T[]>([]);

  // Fetch all coffees
  const fetchCoffees = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/coffees`);
      if (!res.ok) throw new Error('Error fetching coffees');
      const data = await res.json();
      setCoffees(data);
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
