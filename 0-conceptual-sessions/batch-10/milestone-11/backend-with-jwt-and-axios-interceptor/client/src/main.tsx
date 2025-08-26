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
import AuthProvider from './contexts/AuthContext';
import SearchProvider from './contexts/SearchContext';
import './index.css';
import router from './routes/Router';

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
    onSuccess: () => {
      // NOTE: Invalidation only refetches what I currently see on the screen (active Queries) to get an up-to-date view, and everything else will be refetched if we ever need them again.
      queryClient.invalidateQueries();
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
