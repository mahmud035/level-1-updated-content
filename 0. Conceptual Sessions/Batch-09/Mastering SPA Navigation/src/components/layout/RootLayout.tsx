import { Outlet } from 'react-router-dom';
import Footer from '../../shared/Footer';
import Navbar from '../../shared/Navbar';

export default function RootLayout() {
  return (
    <>
      <div className="h-16">
        <Navbar />
      </div>

      <div className="min-h-[calc(100vh-117px)]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
