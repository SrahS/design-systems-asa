"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Transaction, transactionTypes } from '@/types';
import { initialTransactions } from '@/data/mockData';

interface TransactionContextType {
  transactions: Transaction[];
  balance: number;
  income: number;
  expenses: number;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;
  getTransactionById: (id: number) => Transaction | undefined;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // Calcular income (somas de depositos)
  const income = transactions
    .filter(t => t.type === transactionTypes.Deposit)
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular expenses (somas de saques e transferências)
  const expenses = transactions
    .filter(t => 
      t.type === transactionTypes.Withdrawal || 
      t.type === transactionTypes.Transfer)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Calcular balance
  const balance = income - expenses;

  // Adicionar nova transação
  const addTransaction = useCallback((newTransaction: Omit<Transaction, 'id'>) => {
    const id = Math.max(...transactions.map(t => t.id), 0) + 1;
    // setTransactions(prev => [ ...prev, { ...newTransaction, id }]);
    setTransactions(prev => [{ ...newTransaction, id }, ...prev]);
  }, [transactions]);

  // Atualizar transação existente
  const updateTransaction = useCallback((id: number, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  // Deletar transação
  const deleteTransaction = useCallback((id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  // Obter transação por ID
  const getTransactionById = useCallback((id: number) => {
    return transactions.find(t => t.id === id);
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        income,
        expenses,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionById,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
}
