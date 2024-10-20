import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../components/Error/ErrorPage';
import RootLayout from '../components/layout/RootLayout';
import AboutUsPage from '../pages/AboutUsPage';
import ContactUsPage from '../pages/ContactUsPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import ServicesPage from '../pages/ServicesPage';

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
            path: 'services',
            element: <ServicesPage />,
          },
          {
            path: 'about',
            element: <AboutUsPage />,
          },
          {
            path: 'contact',
            element: <ContactUsPage />,
          },
          {
            path: 'profile/:profileId',
            element: <ProfilePage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
