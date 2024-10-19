import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Provider from './providers';
import { Toaster } from 'react-hot-toast';
import QueryProvider from './queryprovider';

const christFont = localFont({
  src: './fonts/NightmareBeforeChristmas.woff',
  variable: '--font-christ',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Leals Christmas Wishes',
  description: 'Created by Oscar Leal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${christFont.variable}`}>
        <QueryProvider>

        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        <Provider>
          <main>{children}</main>
        </Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
