import { Account } from '@/types';
import { Card } from '@/design-system/components/Card';

interface BalanceCardProps {
  account: Account;
}

export function BalanceCard({ account }: BalanceCardProps) {
  return (
    <Card variant="surface-2" padding="lg" className="shadow-soft">
      <div className="mb-4">
        <p className="text-sm font-medium text-text-muted">
          Saldo disponível
        </p>
        <h2 className="text-5xl font-bold mt-2">
          R$ {account.balance.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
        </h2>
      </div>
      <div className="flex flex-wrap gap-10">
        <div>
          <p className="text-xs text-text-muted">Agência</p>
          <p className="mt-1 text-lg text-text">{account.routing}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Número</p>
          <p className="mt-1 text-lg text-text">{account.number}</p>
        </div>
      </div>
    </Card>
  );
}
