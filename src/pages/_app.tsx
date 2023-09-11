import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import AdminLayout from '@/components/layout/AdminLayout';
import Head from 'next/head';
import { redirect } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  // Create a query client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Beatway admin</title>
      </Head>
      <AdminLayout>
        <Component {...pageProps} />;
      </AdminLayout>
    </QueryClientProvider>
  );
}
