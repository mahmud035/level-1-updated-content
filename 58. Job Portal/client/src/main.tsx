import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import toast, { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import AuthProvider from './contexts/AuthContext.tsx';
import SearchProvider from './contexts/SearchContext.tsx';
import './index.css';
import router from './routes/Router.tsx';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
);
