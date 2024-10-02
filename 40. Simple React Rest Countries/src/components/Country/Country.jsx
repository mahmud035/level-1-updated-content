export default function Country({ country }) {
  const {
    name: { common },
    flags: { svg, alt },
  } = country || {};

  // console.log(country);

  return (
    <div className="w-full shadow-xl card bg-base-100">
      <figure>
        <img src={svg} alt={alt} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{common}</h2>
      </div>
    </div>
  );
}
