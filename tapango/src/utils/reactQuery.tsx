import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Basic QueryClient singleton
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const ReactQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // We could wire NetInfo here for offline awareness if needed later
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { queryClient };
