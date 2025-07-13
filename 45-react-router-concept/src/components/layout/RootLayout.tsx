import { Outlet } from 'react-router-dom';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';

export default function RootLayout() {
  return (
    <div className="p-4 mx-auto max-w-7xl">
      <Header />

      <div className="min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
