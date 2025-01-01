import { Outlet, ScrollRestoration } from 'react-router';
import Footer from '../shared/Footer';
import Header from '../shared/Header';

export default function RootLayout() {
  return (
    <div className="container">
      <Header />
      <div className="min-h-[calc(100vh-84px)] pb-12">
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
