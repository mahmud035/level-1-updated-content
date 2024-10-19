import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import './index.css';
import Contact, {
  action as contactAction,
  loader as contactLoader,
} from './routes/Contact';
import { action as destroyAction } from './routes/Destroy';
import EditContact, { action as editAction } from './routes/Edit';
import Index from './routes/Index';
import Root, {
  action as rootAction,
  loader as rootLoader,
} from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        // IMPORTANT: RootLayout or DashboardLayout যেন break না করে, সেজন্য ভিতরে আবার এই errorElement টা ব্যবহার করা হয়েছে। এরফলে যেখানে error হবে, শুধু ঐখানে error page / error message দেখাবে। Full UI break করবে না। এটাতে user experience (UX) better হবে।
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
