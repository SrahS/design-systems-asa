import { Account, Metrics, Transaction, transactionTypes } from '@/types';

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

export const initialTransactions: Transaction[] = [];

export const createInitialAccount = (transactions: Transaction[]): Account => {
  const totalDeposits = transactions
    .filter(t => t.type === transactionTypes.Deposit)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter(t => t.type === transactionTypes.Withdrawal)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalTransfers = transactions
    .filter(t => t.type === transactionTypes.Transfer)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalDeposits - totalWithdrawals - totalTransfers;

  return {
    name: 'Bem vindo, Kawai',
    number: '****4892',
    routing: '12345',
    status: 'Ativo',
    balance,
  };
};

export const mockAccount = createInitialAccount(initialTransactions);