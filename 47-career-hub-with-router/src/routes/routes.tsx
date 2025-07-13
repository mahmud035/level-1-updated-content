import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import AppliedJobsPage from '../pages/AppliedJobsPage';
import BlogPage from '../pages/BlogPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import JobDetailsPage from '../pages/JobDetailsPage';
import StatisticsPage from '../pages/StatisticsPage';

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
            path: 'applied-jobs',
            element: <AppliedJobsPage />,
          },
          {
            path: 'jobs/:id',
            element: <JobDetailsPage />,
          },
          {
            path: 'statistics',
            element: <StatisticsPage />,
          },
          {
            path: 'blog',
            element: <BlogPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
