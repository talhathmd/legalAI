// pages/_app.tsx
import { AuthProvider } from '@propelauth/react';
import { AppProps } from 'next/app';

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || "https://localhost:3000";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider authUrl={authUrl}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
