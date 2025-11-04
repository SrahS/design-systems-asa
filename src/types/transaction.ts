export interface Transaction {
  id: number;
  name: string;
  date: string;
  reference: string;
  amount: number;
  type: 'Saque' | 'Transferência' | 'Deposito';
}

export interface TransactionListProps {
  transactions: Transaction[];
}
