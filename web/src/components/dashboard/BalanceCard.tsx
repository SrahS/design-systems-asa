import { Account } from '@/types';
import { Card } from '@/design-system/components/Card';

interface BalanceCardProps {
  account: Account;
}

export function BalanceCard({ account }: BalanceCardProps) {
  return (
    <Card variant="surface-2" padding="lg" className="shadow-md border border-gray-200">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <p className="text-lg font-medium text-gray-600">
          Saldo disponível
        </p>
        <h2 className="text-5xl md:text-6xl font-bold mt-2 text-gray-900">
          R$ {account.balance.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
        </h2>
      </div>

      <div className="flex flex-wrap gap-12">
        <div>
          <p className="text-base font-medium text-gray-500 uppercase tracking-wide">Agência</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{account.routing}</p>
        </div>
        <div>
          <p className="text-base font-medium text-gray-500 uppercase tracking-wide">Número da Conta</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{account.number}</p>
        </div>
      </div>
    </Card>
  );
}