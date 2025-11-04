export type transactionType = 'Saque' | 'Transferência' | 'Deposito';

export const transactionTypes = {
  Withdrawal: 'Saque' as transactionType,
  Transfer: 'Transferência' as transactionType,
  Deposit: 'Deposito' as transactionType,
}

export interface Transaction {
  id: number;
  name: string;
  date: string;
  reference: string;
  amount: number;
  type: transactionType;
  description?: string;
}

export interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: number) => void;
  onViewDetails?: (transaction: Transaction) => void;
}
