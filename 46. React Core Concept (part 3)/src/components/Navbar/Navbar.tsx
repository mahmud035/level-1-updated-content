import { useState } from 'react';
import { FaBars, FaX } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const routes = [
    { id: 1, path: '/', name: 'Home' },
    { id: 2, path: '/products', name: 'Products' },
    { id: 3, path: '/recipes', name: 'Recipes' },
    { id: 4, path: '/posts', name: 'Posts' },
  ];

  return (
    <nav className="relative flex items-center justify-between py-2">
      <h3 className="text-3xl font-bold">Navbar</h3>

      <ul
        className={`${
          showNavLinks
            ? 'flex flex-col gap-4 absolute top-6 left-1/2'
            : 'hidden'
        } md:flex md:gap-6 xl:gap-8`}
      >
        {routes.map((route) => (
          <li key={route.id}>
            <NavLink
              to={`${route.path}`}
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-700 font-medium text-lg'
                  : 'font-medium text-lg'
              }
            >
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowNavLinks((prevValue) => !prevValue)}
        className="md:hidden"
      >
        {showNavLinks ? <FaX size={24} /> : <FaBars size={24} />}
      </button>

      <Link
        to="/register"
        className="hidden px-5 py-2 text-lg font-medium rounded-lg md:inline-block bg-cyan-800"
      >
        Register
      </Link>
    </nav>
  );
}
