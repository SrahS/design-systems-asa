import { Account, Metrics, Transaction } from '@/types';

export const mockAccount: Account = {
  name: 'Premier Checking',
  number: '****4892',
  routing: '821###021',
  status: 'Active',
  balance: -20100.00,
};

export const mockMetrics: Metrics = {
  income: {
    label: 'This Month Income',
    amount: 0.00,
    type: 'positive',
  },
  expenses: {
    label: 'This Month Expenses',
    amount: -25100.00,
    type: 'negative',
  },
  netChange: {
    label: 'Net Change',
    amount: -25100.00,
    type: 'neutral',
  },
};

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    name: 'teste 02',
    date: 'Oct 13, 2025',
    reference: 'Ref',
    amount: -25000.00,
    type: 'Withdrawal',
  },
  {
    id: 2,
    name: 'teste',
    date: 'Oct 13, 2025',
    reference: 'Ref',
    amount: -100.00,
    type: 'Transfer',
  },
];
