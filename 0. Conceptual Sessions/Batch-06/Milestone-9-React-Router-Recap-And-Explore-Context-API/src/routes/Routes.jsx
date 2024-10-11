import { createBrowserRouter } from 'react-router-dom';
import About from '../components/About';
import Cart from '../components/Cart';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/Home';
import Shop from '../components/Shop';
import Main from '../layout/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

export default router;
