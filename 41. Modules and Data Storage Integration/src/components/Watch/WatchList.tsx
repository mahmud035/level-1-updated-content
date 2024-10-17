import useFetchData from '../../hooks/useFetchData';
import { IWatch } from '../../types';
import Watch from './Watch';

export default function WatchList() {
  const watches = useFetchData<IWatch>('watches.json');

  return (
    <>
      <h1 className="text-2xl font-semibold text-center text-white">
        ⌚ Watch List ⌚
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {watches.map((watch) => (
          <Watch key={watch.id} watch={watch} />
        ))}
      </div>
    </>
  );
}
