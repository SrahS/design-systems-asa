"use client";

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Navigation } from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  accountName: string;
  accountNumber: string;
  status: string;
}

export function Header({ accountName, accountNumber, status }: HeaderProps) {
  return (
    <header className="bg-primary-100-on-light border-b border-color-neutral-200-on-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center bg-color-primary-800-on-light shrink-0"
              aria-hidden="true"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="font-bold text-xl text-primary-1200-on-light"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-1200-on-light leading-tight">
                {accountName}
              </h1>
              <p className="text-base font-medium text-neutral-600-on-light mt-1">
                Conta {accountNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-base px-3 py-1">
              {status}
            </Badge>
            <Button
              variant="primary"
              className="min-h-[48px] px-6 text-base font-bold"
              aria-label="Sair da sua conta"
            >
              Sair
            </Button>
          </div>
        </div>

        <Navigation />
      </div>
    </header>
  );
}