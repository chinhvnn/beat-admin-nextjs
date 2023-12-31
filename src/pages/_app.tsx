import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AdminLayout from '@/components/layout/AdminLayout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  // Create a query client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Head>
        <title>Test Admin</title>
      </Head>
      <AdminLayout>
        <Component {...pageProps} />;
      </AdminLayout>
    </QueryClientProvider>
  );
}
