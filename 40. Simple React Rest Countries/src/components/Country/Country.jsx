export default function Country({ country }) {
  const {
    name: { common },
    flags: { svg, alt },
    capital,
    population,
    area,
  } = country || {};

  console.log(country);

  return (
    <div className="w-full shadow-xl h-80 card bg-base-100">
      <figure>
        <img src={svg} alt={alt} className="w-full h-40" />
      </figure>
      <div className="p-2 card-body">
        <h2 className="text-xl font-medium card-title">Name: {common}</h2>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <p>Area: {area} Sq. km</p>
      </div>
    </div>
  );
}
