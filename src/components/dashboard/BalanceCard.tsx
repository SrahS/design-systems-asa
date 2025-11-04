import { Account } from '@/types';
import { Card } from '@/components/ui/Card';

interface BalanceCardProps {
  account: Account;
}

export function BalanceCard({ account }: BalanceCardProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 text-white">
      <div className="mb-4">
        <p className="text-sm font-medium opacity-90">Saldo disponível</p>
        <h2 className="text-5xl font-bold mt-2">
          R$ {account.balance.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
        </h2>
      </div>
      <div className="flex gap-8 text-sm">
        <div>
          <p className="opacity-75">Agência</p>
          <p className="font-medium">{account.routing}</p>
        </div>
        <div>
          <p className="opacity-75">Número </p>
          <p className="font-medium">{account.number}</p>
        </div>
      </div>
    </Card>
  );
}
