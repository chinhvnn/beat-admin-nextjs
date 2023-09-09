import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import AdminLayout from '@/components/layout/AdminLayout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Beatway admin</title>
      </Head>
      <AdminLayout>
        <Component {...pageProps} />;
      </AdminLayout>
    </>
  );
}
