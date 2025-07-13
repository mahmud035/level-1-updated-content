import BottleList from './components/Bottle/BottleList';
import WatchList from './components/Watch/WatchList';

export default function App() {
  return (
    <div className="p-4 mx-auto max-w-7xl">
      <BottleList />
      <WatchList />
    </div>
  );
}
