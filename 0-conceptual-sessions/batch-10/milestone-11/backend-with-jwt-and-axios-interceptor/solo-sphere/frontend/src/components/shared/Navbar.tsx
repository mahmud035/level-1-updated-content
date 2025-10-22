import { Link } from 'react-router';
import logo from '../../assets/images/logo.png';
import placeholderAvatar from '../../assets/images/placeholderAvatar.jpg';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';

const Navbar = () => {
  const { user } = useAuth();
  const logoutUser = useLogout();

  return (
    <div className="container px-4 mx-auto shadow-sm navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold">SoloSphere</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">All Jobs</Link>
          </li>

          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <div className="z-50 dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                title={user?.displayName ?? ''}
                className="w-10 rounded-full"
              >
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL || placeholderAvatar} // Fallback to placeholder if photoURL is empty
                  onError={(e) => (e.currentTarget.src = placeholderAvatar)} // On error, set the src to the placeholder
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/add-job" className="justify-between">
                  Add Job
                </Link>
              </li>
              <li>
                <Link to="/my-posted-jobs">My Posted Jobs</Link>
              </li>
              <li>
                <Link to="/my-bids">My Bids</Link>
              </li>
              <li>
                <Link to="/bid-requests">Bid Requests</Link>
              </li>
              <li className="mt-2">
                <button
                  onClick={logoutUser}
                  className="block text-center bg-gray-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
