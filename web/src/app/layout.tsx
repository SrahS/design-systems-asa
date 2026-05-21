import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TabProvider } from '@/contexts/TabContext';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Premier Checking - Dashboard',
  description: 'Financial dashboard for Premier Checking account',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Providers>
          <TabProvider>
            {children}
          </TabProvider>
        </Providers>
      </body>
    </html>
  );
}
