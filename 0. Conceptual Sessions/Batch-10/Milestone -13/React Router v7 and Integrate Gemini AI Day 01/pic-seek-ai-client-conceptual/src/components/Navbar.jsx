import { Link } from 'react-router';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Clipdrop APIs
        </Link>
      </div>

      <ul className="flex gap-5">
        <Link to="/">Home</Link>

        <Link to="/generate">Generate Images</Link>
      </ul>
    </div>
  );
}
