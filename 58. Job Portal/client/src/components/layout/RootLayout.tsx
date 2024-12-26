import { Outlet } from 'react-router';
import Header from '../shared/Header';

export default function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
