import { IWatch } from '../../types';

interface IWatchProps {
  watch: IWatch;
}

export default function Watch({ watch }: IWatchProps) {
  const {
    brand,
    model,
    price,
    availability,
    releaseYear,
    batteryLife,
    features,
  } = watch;

  return (
    <div className="shadow-xl card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Name: {model}</h2>
        <p>Brand: {brand}</p>
        <p>Price: {price}$</p>
        <p>BatteryLife: {batteryLife}</p>
        <p>Availability: {availability ? 'Available' : 'Unavailable'}</p>
        <p>ReleaseYear: {releaseYear}</p>
        <p>Features:</p>
        <ul>
          {features.map((feature) => (
            <li key={feature} className="ml-5 list-disc">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
