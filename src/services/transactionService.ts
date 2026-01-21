import axios from 'axios';
import { Transaction } from '@/types/transaction';

const API_URL = 'http://localhost:3001';

// Criar instância do axios com base URL
const api = axios.create({
  baseURL: API_URL,
});

export const transactionService = {
  // GET todas as transações
  fetchAllTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  },

  // GET transação por ID
  fetchTransactionById: async (id: number): Promise<Transaction> => {
    const response = await api.get<Transaction>(`/transactions/${id}`);
    return response.data;
  },

  // POST nova transação
  createTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const response = await api.post<Transaction>('/transactions', transaction);
    return response.data;
  },

  // PUT atualizar transação
  updateTransaction: async (
    id: number,
    updates: Partial<Transaction>
  ): Promise<Transaction> => {
    const response = await api.put<Transaction>(`/transactions/${id}`, updates);
    return response.data;
  },

  // DELETE transação
  deleteTransaction: async (id: number): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};
