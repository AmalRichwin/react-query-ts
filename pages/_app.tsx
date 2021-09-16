// _app.tsx
import '@styles/globals.css';

import { FC } from 'react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Toaster position="top-center" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
