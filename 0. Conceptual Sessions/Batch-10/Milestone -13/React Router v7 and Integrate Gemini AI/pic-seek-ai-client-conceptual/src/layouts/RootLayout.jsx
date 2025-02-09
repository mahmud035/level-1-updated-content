import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

export default function RootLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      {/* Child routes are rendered through the <Outlet/> in the parent route. */}
      <Outlet />
    </div>
  );
}
