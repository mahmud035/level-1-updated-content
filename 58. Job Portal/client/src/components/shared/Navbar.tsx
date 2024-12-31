import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../../assets/icons/job-logo.png';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/jobs">Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      navigate('/login');
    });
  };

  return (
    <div className="px-0 navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="pl-0 text-xl btn btn-ghost">
          <img src={logo} alt="" className="h-12" />
          Job Portal
        </Link>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">{links}</ul>
      </div>
      <div className="flex gap-3 navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
