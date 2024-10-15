import { useEffect, useState } from 'react';
import Country from './Country';

export default function CountryList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) throw new Error('Network response was not OK');
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {countries.map((country) => (
        <Country key={country?.name?.common} country={country} />
      ))}
    </div>
  );
}
