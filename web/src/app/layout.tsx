import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TabProvider } from '@/contexts/TabContext';
import { Providers } from './providers';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SeniorEase | Plataforma Acessível',
  description: 'Organizador de atividades simplificado e acessível para a terceira idade.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <AccessibilityProvider>
            <TabProvider>
              {children}
            </TabProvider>
          </AccessibilityProvider>
        </Providers>
      </body>
    </html>
  );
}