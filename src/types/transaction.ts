export interface Transaction {
  id: number;
  name: string;
  date: string;
  reference: string;
  amount: number;
  type: 'Withdrawal' | 'Transfer' | 'Deposit';
}

export interface TransactionListProps {
  transactions: Transaction[];
}
