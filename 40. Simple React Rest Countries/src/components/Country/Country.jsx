import { useState } from 'react';

export default function Country({ country, handleVisitedCountries }) {
  const {
    name: { common },
    flags: { svg, alt },
    capital,
    population,
    area,
  } = country || {};

  const [isVisited, setIsVisited] = useState(false);

  const handleVisited = (country) => {
    setIsVisited((preValue) => !preValue);
    handleVisitedCountries(country);
  };

  return (
    <div className="w-full h-[430px] shadow-xl card bg-base-100">
      <figure>
        <img src={svg} alt={alt} className="w-full h-48" />
      </figure>
      <div className="p-4 card-body">
        <h2 className="text-xl font-medium card-title">Name: {common}</h2>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <p>Area: {area} Sq. km</p>
        <button
          onClick={() => handleVisited(country)}
          className={`btn btn-sm ${isVisited ? 'btn-accent' : 'btn-neutral'}`}
        >
          {isVisited ? 'Visited' : 'Going'}
        </button>
      </div>
    </div>
  );
}
