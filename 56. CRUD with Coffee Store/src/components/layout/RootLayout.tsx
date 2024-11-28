import { Outlet } from 'react-router';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';

export default function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
