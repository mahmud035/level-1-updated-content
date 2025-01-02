import { createBrowserRouter } from 'react-router';
import RootLayout from '../components/layout/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegistrationPage from '../pages/auth/RegistrationPage';
import AddJobPage from '../pages/job/AddJobPage';
import AllJobPage from '../pages/job/AllJobPage';
import JobApplyPage from '../pages/job/JobApplyPage';
import JobDetailsPage from '../pages/job/JobDetailsPage';
import MyApplicationsPage from '../pages/job/MyApplicationsPage';
import MyPostedJobPage from '../pages/job/MyPostedJobPage';
import PrivateRoute from './PrivateRoute';

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
          {
            path: 'all-jobs',
            element: <AllJobPage />,
          },
          {
            path: 'jobs/:id',
            element: (
              <PrivateRoute>
                <JobDetailsPage />
              </PrivateRoute>
            ),
          },
          {
            path: 'job-apply/:id',
            element: (
              <PrivateRoute>
                <JobApplyPage />
              </PrivateRoute>
            ),
          },
          {
            path: 'my-applications',
            element: (
              <PrivateRoute>
                <MyApplicationsPage />
              </PrivateRoute>
            ),
          },
          {
            path: 'add-job',
            element: (
              <PrivateRoute>
                <AddJobPage />
              </PrivateRoute>
            ),
          },
          {
            path: 'my-posted-jobs',
            element: (
              <PrivateRoute>
                <MyPostedJobPage />
              </PrivateRoute>
            ),
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegistrationPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
