import { Outlet, ScrollRestoration } from 'react-router';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

export default function RootLayout() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Outlet */}
      <div className="min-h-[calc(100vh-306px)]">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll Restoration */}
      <ScrollRestoration />
    </div>
  );
}
