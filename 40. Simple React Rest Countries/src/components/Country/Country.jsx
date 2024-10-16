import { useState } from 'react';

export default function Country({ country }) {
  const {
    name: { common },
    flags: { svg, alt },
    capital,
    population,
    area,
    cca3,
  } = country || {};

  const [visited, setVisited] = useState(false);

  // https://restcountries.com/v3.1/alpha?codes=170

  const handleVisited = () => {
    setVisited((preValue) => !preValue);
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
          onClick={handleVisited}
          className={`btn btn-sm ${visited ? 'btn-accent' : 'btn-neutral'}`}
        >
          {visited ? 'Visited' : 'Going'}
        </button>
        <button className="btn btn-sm btn-neutral">Code: {cca3}</button>
      </div>
    </div>
  );
}
