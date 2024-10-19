import { useState } from 'react';
import { FaBars, FaX } from 'react-icons/fa6';
import NavLinks from './NavLinks';

export default function Navbar() {
  const [showNavItem, setShowNavItem] = useState(false);

  const routes = [
    { id: 1, path: '/', name: 'Home' },
    { id: 2, path: '/about', name: 'About Us' },
    { id: 3, path: '/services', name: 'Services' },
    { id: 4, path: '/contact', name: 'Contact' },
    { id: 5, path: '/profile/:id', name: 'User Profile' },
  ];

  return (
    <nav className="relative flex items-center justify-between py-2">
      <h3 className="text-2xl font-bold">Navbar</h3>

      <NavLinks routes={routes} showNavItem={showNavItem} />

      <button
        onClick={() => setShowNavItem((prevValue) => !prevValue)}
        className="md:hidden"
      >
        {showNavItem ? <FaX size={24} /> : <FaBars size={24} />}
      </button>

      <button className="hidden px-5 py-2 font-medium rounded-lg md:inline-block bg-cyan-800">
        Login
      </button>
    </nav>
  );
}
