import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {transaction.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{transaction.name}</p>
              <p className="text-xs text-gray-500">
                {transaction.date} • {transaction.reference}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${
              transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500">{transaction.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
