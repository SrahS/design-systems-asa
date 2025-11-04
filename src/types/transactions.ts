export type transactionType = 'Saque' | 'Transferência' | 'Deposito';

export interface Transaction {
  id: number;
  name: string;
  date: string;
  reference: string;
  amount: number;
  type: transactionType;
}