import { useEffect, useState } from 'react';
import Country from './Country';
import VisitedCountry from './VisitedCountry';

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);

  const handleVisitedCountries = (countryToVisit) => {
    const isCountryVisited = visitedCountries.find(
      (country) => country.cca3 === countryToVisit.cca3
    );

    /*
      ✅ Update the state of `visitedCountries` based on whether the country is already visited.
      👉 If the country is already visited, filter it out from the array of previously visited countries.
      👉 Otherwise, add the country to the array of previously visited countries.  
    */

    setVisitedCountries((prevCountries) =>
      isCountryVisited
        ? prevCountries.filter(
            (country) => country.cca3 !== countryToVisit.cca3
          )
        : [...prevCountries, countryToVisit]
    );
  };

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
    <>
      <h2 className="pt-2 text-2xl font-semibold text-center text-accent">
        Visited Country List ✈🗺️
      </h2>

      <div className="p-4 my-4 border-2 rounded-lg">
        {visitedCountries.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {visitedCountries.map((country) => (
              <VisitedCountry key={country?.name?.common} country={country} />
            ))}
          </div>
        ) : (
          <p className="py-5 text-2xl font-semibold text-center text-white">
            You haven`t visit any country yet! 😟
          </p>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-center text-white">
        Country List
      </h2>

      {countries.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {countries.map((country) => (
            <Country
              key={country?.name?.common}
              country={country}
              handleVisitedCountries={handleVisitedCountries}
            />
          ))}
        </div>
      ) : (
        <p className="pt-40 text-2xl font-medium text-center text-white">
          Loading Countries...
        </p>
      )}
    </>
  );
}
