import { createBrowserRouter } from 'react-router';
import RootLayout from '../components/layout/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
