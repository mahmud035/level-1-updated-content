import { createBrowserRouter } from 'react-router-dom';
import Add from '../components/Dashboard/Add';
import AllProducts from '../components/Dashboard/AllProducts';
import Dashboard from '../components/Dashboard/Dashboard';
import Home from '../components/Home/Home';
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/Main';
import EditProduct from '../components/Dashboard/EditProduct';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/products',
        element: <AllProducts />,
      },
      {
        path: '/dashboard/add-product',
        element: <Add />,
      },
      {
        path: '/dashboard/product/edit/:id',
        element: <EditProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
    ],
  },
]);

export default routes;
