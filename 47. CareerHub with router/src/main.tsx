import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import JobProvider from './contexts/JobContext';
import './index.css';
import router from './routes/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JobProvider>
      <RouterProvider router={router} />
    </JobProvider>
  </StrictMode>
);
