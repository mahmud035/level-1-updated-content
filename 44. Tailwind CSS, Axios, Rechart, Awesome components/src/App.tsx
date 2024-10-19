import Navbar from './components/Navbar/Navbar';
import PriceOptionList from './components/PriceOption/PriceOptionList';

export default function App() {
  return (
    <div className="p-4 mx-auto max-w-7xl">
      <Navbar />
      <PriceOptionList />
    </div>
  );
}
