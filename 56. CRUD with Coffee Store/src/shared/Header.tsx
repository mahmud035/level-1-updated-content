import bgHeader from '../assets/images/bg-header.jpg';
import logo from '../assets/images/logo.png';

export default function Header() {
  return (
    <div
      className="p-4"
      style={{
        backgroundImage: `url(${bgHeader})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center justify-center gap-4 text-white">
        <img src={logo} alt="" className="w-16" />
        <h3 className="text-5xl">Espresso Emporium</h3>
      </div>
    </div>
  );
}
