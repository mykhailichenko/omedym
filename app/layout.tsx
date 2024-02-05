import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from './providers';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Test App',
  description: 'Todo test task',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>

      <Providers>
          <Header />
          {children}
          <Footer />
      </Providers>

      </body>
    </html>
  )
}
