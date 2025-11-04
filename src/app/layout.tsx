import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TabProvider } from '@/contexts/TabContext';
import { TransactionProvider } from '@/contexts/TransactionContext';

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
        <TransactionProvider>
          <TabProvider>
            {children}
          </TabProvider>
        </TransactionProvider>
      </body>
    </html>
  );
}
