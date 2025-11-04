import { Account, Metrics, Transaction } from '@/types';

export const mockAccount: Account = {
  name: 'Bem vindo, Alisson',
  number: '****4892',
  routing: '12345',
  status: 'Ativo',
  balance: 150.00,
};

export const mockMetrics: Metrics = {
  income: {
    label: 'Receita deste mês',
    amount: 10.00,
    type: 'positive',
  },
  expenses: {
    label: 'Gastos',
    amount: 0.00,
    type: 'negative',
  },
  netChange: {
    label: 'Renda líquida',
    amount: 100.00,
    type: 'neutral',
  },
};

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    name: 'teste 02',
    date: 'Oct 25, 2025',
    reference: 'Ref',
    amount: -25000.00,
    type: 'Saque',
  },
  {
    id: 2,
    name: 'teste',
    date: 'Oct 20, 2025',
    reference: 'Ref',
    amount: -100.00,
    type: 'Transferência',
  },
];
