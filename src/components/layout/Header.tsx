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
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">R$</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{accountName}</h1>
              <p className="text-sm text-gray-500">Conta {accountNumber}</p>
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
