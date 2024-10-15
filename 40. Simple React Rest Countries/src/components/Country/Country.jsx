export default function Country({ country }) {
  const {
    name: { common },
    flags: { svg, alt },
    capital,
    population,
    area,
    cca3,
  } = country || {};

  // https://restcountries.com/v3.1/alpha?codes=170

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
        <button className="btn btn-sm btn-neutral">Visited</button>
        <button className="btn btn-sm btn-neutral">Code: {cca3}</button>
      </div>
    </div>
  );
}
