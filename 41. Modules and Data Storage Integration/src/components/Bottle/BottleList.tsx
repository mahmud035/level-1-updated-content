import useFetchData from '../../hooks/useFetchData';
import { IBottle } from '../../types';
import Bottle from './Bottle';

export default function BottleList() {
  const bottles = useFetchData<IBottle>('bottles.json');

  return (
    <>
      <h2 className="py-8 text-2xl font-semibold text-center text-white">
        🧴 Bottle List 🧴
      </h2>

      <div className="grid grid-cols-1 gap-5 pb-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {bottles.map((bottle) => (
          <Bottle key={bottle.id} bottle={bottle} />
        ))}
      </div>
    </>
  );
}
