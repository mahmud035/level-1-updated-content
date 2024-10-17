import { useEffect, useState } from 'react';
import { IWatch } from '../../types';
import Watch from './Watch';

export default function WatchList() {
  const [watches, setWatches] = useState<IWatch[]>([]);

  useEffect(() => {
    const fetchWatch = async () => {
      const res = await fetch('watches.json');
      if (!res.ok) throw new Error('Network response was not OK');
      const data = await res.json();
      setWatches(data);
    };

    fetchWatch();
  }, []);

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
