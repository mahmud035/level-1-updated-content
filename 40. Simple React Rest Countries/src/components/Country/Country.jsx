export default function Country({ country }) {
  const {
    name: { common },
    flags: { svg, alt },
  } = country || {};

  // console.log(country);

  return (
    <div className="w-full shadow-xl h-80 card bg-base-100">
      <figure>
        <img src={svg} alt={alt} className="w-full h-40" />
      </figure>
      <div className="p-2 card-body">
        <h2 className="text-xl font-medium card-title">Name: {common}</h2>
      </div>
    </div>
  );
}
