import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <Footer />
    </>
  );
}
