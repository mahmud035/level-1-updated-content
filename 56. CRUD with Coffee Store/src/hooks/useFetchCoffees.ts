import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function useFetchCoffees<T>() {
  const [coffees, setCoffees] = useState<T[]>([]);

  // Fetch all coffees
  const fetchCoffees = async () => {
    try {
      const res = await fetch('http://localhost:5000/coffees');
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
