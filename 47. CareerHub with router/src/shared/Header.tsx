import Hero from '../components/Hero/Hero';
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="bg-[#F9F9FF]">
      <div className="max-w-7xl mx-auto px-4">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
