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

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    name: 'Depósito via PIX',
    date: '2026-01-10T09:15:00-03:00',
    reference: 'PIX-8F3A1C9D',
    amount: 3500.0,
    type: transactionTypes.Deposit,
    description: 'Crédito recebido via PIX (Banco Inter)',
  },
  {
    id: 2,
    name: 'Transferência para João Silva',
    date: '2026-01-10T14:22:10-03:00',
    reference: 'TED-20260110-1422',
    amount: -420.75,
    type: transactionTypes.Transfer,
    description: 'Pagamento de serviços',
  },
  {
    id: 3,
    name: 'Saque em caixa 24h',
    date: '2026-01-11T08:05:33-03:00',
    reference: 'ATM-2401-884512',
    amount: -200.0,
    type: transactionTypes.Withdrawal,
    description: 'Tarifa inclusa',
  },
  {
    id: 4,
    name: 'Depósito em dinheiro',
    date: '2026-01-11T12:40:00-03:00',
    reference: 'CASH-DEP-771204',
    amount: 150.0,
    type: transactionTypes.Deposit,
  },
  {
    id: 5,
    name: 'Transferência entre contas',
    date: '2026-01-11T18:12:45-03:00',
    reference: 'INT-TRF-113820',
    amount: -1000.0,
    type: transactionTypes.Transfer,
    description: 'Transferência para conta poupança',
  },
  {
    id: 6,
    name: 'Depósito de estorno',
    date: '2026-01-12T07:55:05-03:00',
    reference: 'REV-CHG-009182',
    amount: 89.9,
    type: transactionTypes.Deposit,
    description: 'Estorno de compra (iFood)',
  },
  {
    id: 7,
    name: 'Saque emergencial',
    date: '2026-01-12T09:02:19-03:00',
    reference: 'ATM-EMR-220914',
    amount: -50.0,
    type: transactionTypes.Withdrawal,
  },
];

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
    name: 'Bem vindo, Alisson',
    number: '**** 4892',
    routing: '12345',
    status: 'Ativo',
    balance,
  };
};

export const mockAccount = createInitialAccount(initialTransactions);