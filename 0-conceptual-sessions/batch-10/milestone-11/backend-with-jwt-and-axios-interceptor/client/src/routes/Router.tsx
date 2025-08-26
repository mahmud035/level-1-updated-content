import { createBrowserRouter } from 'react-router';
import RootLayout from '../components/layouts/RootLayout';
import AxiosProvider from '../contexts/AxiosContext';
import Login from '../pages/Authentication/Login';
import Registration from '../pages/Authentication/Registration';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import AddJob from '../pages/Job/AddJob';
import AllJobs from '../pages/Job/AllJobs';
import JobDetails from '../pages/Job/JobDetails';
import MyPostedJobs from '../pages/Job/MyPostedJobs';
import UpdateJob from '../pages/Job/UpdateJob';
import BidRequests from '../pages/JobBid/BidRequests';
import MyBids from '../pages/JobBid/MyBids';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AxiosProvider>
        <RootLayout />
      </AxiosProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/jobs',
            element: <AllJobs />,
          },
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/registration',
            element: <Registration />,
          },
          {
            path: '/job/:id',
            element: (
              <PrivateRoute>
                <JobDetails />
              </PrivateRoute>
            ),
          },
          {
            path: '/update/:id',
            element: (
              <PrivateRoute>
                <UpdateJob />
              </PrivateRoute>
            ),
          },
          {
            path: '/add-job',
            element: (
              <PrivateRoute>
                <AddJob />
              </PrivateRoute>
            ),
          },
          {
            path: '/my-bids',
            element: (
              <PrivateRoute>
                <MyBids />
              </PrivateRoute>
            ),
          },
          {
            path: '/my-posted-jobs',
            element: (
              <PrivateRoute>
                <MyPostedJobs />
              </PrivateRoute>
            ),
          },
          {
            path: '/bid-requests',
            element: (
              <PrivateRoute>
                <BidRequests />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
