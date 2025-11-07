"use client";

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Navigation } from './Navigation';

interface HeaderProps {
  accountName: string;
  accountNumber: string;
  status: string;
}

export function Header({ accountName, accountNumber, status }: HeaderProps) {
  return (
    <header className="
      bg-primary-100-on-ligh
      border-b border-color-neutral-200-on-light dark:border-color-neutral-800-on-dark
    ">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="
              w-8 h-8 rounded flex items-center justify-center
              bg-color-primary-800-on-light dark:bg-color-primary-dark-600-on-dark
            ">
              <span className="
                font-bold text-sm 
                text-yellow-300
              ">
                R$
              </span>
            </div>
            <div>
              <h1 className="
                text-xl font-bold 
                text-primary-1200-on-light dark:text-primary-1200-on-dark
              ">
                {accountName}
              </h1>
              <p className="
                text-sm 
                text-primary-1200-on-light dark:text-primary-1200-on-dark
              ">
                Conta {accountNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">{status}</Badge>
            <Button variant="primary">Logout</Button>
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
