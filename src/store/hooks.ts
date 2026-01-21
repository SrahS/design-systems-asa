import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { useMemo } from 'react';
import { transactionTypes } from '@/types/transaction';
import {
  addTransactionAsync,
  updateTransactionAsync,
  deleteTransactionAsync,
  fetchTransactions,
  fetchTransactionById,
} from './slices/transactionSlice';

// Hooks tipados
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook equivalente ao antigo useTransactions()
 * Agora integrado com JSON Server
 */
export function useTransactions() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(state => state.transactions.transactions);
  const loading = useAppSelector(state => state.transactions.loading);
  const error = useAppSelector(state => state.transactions.error);

  // Calcular income (somas de depositos)
  const income = useMemo(
    () =>
      transactions
        .filter(t => t.type === transactionTypes.Deposit)
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  // Calcular expenses (somas de saques e transferências)
  const expenses = useMemo(
    () =>
      transactions
        .filter(
          t =>
            t.type === transactionTypes.Withdrawal ||
            t.type === transactionTypes.Transfer
        )
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    [transactions]
  );

  // Calcular balance
  const balance = income - expenses;

  // Obter transação por ID (local)
  const getTransactionById = (id: number) => {
    return transactions.find(t => t.id === id);
  };

  return {
    transactions,
    balance,
    income,
    expenses,
    loading,
    error,
    // Async actions (comunicam com servidor)
    fetchTransactions: () => dispatch(fetchTransactions()),
    addTransaction: (newTransaction: Omit<any, 'id'>) =>
      dispatch(addTransactionAsync(newTransaction)),
    updateTransaction: (id: number, updates: Partial<any>) =>
      dispatch(updateTransactionAsync({ id, updates })),
    deleteTransaction: (id: number) =>
      dispatch(deleteTransactionAsync(id)),
    fetchTransactionById: (id: number) =>
      dispatch(fetchTransactionById(id)),
    getTransactionById,
  };
}
