import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../components/Error/ErrorPage';
import RootLayout from '../components/layout/RootLayout';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // IMPORTANT: RootLayout or DashboardLayout যেন break না করে, সেজন্য ভিতরে আবার এই errorElement টা ব্যবহার করা হয়েছে। এরফলে যেখানে error হবে, শুধু ঐখানে error page / error message দেখাবে। Full UI break করবে না। এটাতে user experience (UX) better হবে।

        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
