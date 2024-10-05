// pages/_app.tsx
import { AuthProvider } from '@propelauth/react';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
