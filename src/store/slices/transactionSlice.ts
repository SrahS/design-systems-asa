import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, transactionTypes } from '@/types/transaction';
import { initialTransactions } from '@/data/mockData';
import { transactionService } from '@/services/transactionService';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: initialTransactions,
  loading: false,
  error: null,
};

// ============ ASYNC THUNKS ============

/**
 * Buscar todas as transações do servidor
 */
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await transactionService.fetchAllTransactions();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao buscar transações');
    }
  }
);

/**
 * Buscar transação por ID
 */
export const fetchTransactionById = createAsyncThunk(
  'transactions/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await transactionService.fetchTransactionById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao buscar transação');
    }
  }
);

/**
 * Criar nova transação no servidor
 */
export const addTransactionAsync = createAsyncThunk(
  'transactions/add',
  async (transaction: Omit<Transaction, 'id'>, { rejectWithValue }) => {
    try {
      const data = await transactionService.createTransaction(transaction);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao criar transação');
    }
  }
);

/**
 * Atualizar transação no servidor
 */
export const updateTransactionAsync = createAsyncThunk(
  'transactions/update',
  async (
    { id, updates }: { id: number; updates: Partial<Transaction> },
    { rejectWithValue }
  ) => {
    try {
      const data = await transactionService.updateTransaction(id, updates);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao atualizar transação');
    }
  }
);

/**
 * Deletar transação no servidor
 */
export const deleteTransactionAsync = createAsyncThunk(
  'transactions/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await transactionService.deleteTransaction(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao deletar transação');
    }
  }
);

// ============ SLICE ============

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Ações síncronas (opcional, se quiser suportar ambos)
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const nextId = state.transactions.length > 0
        ? Math.max(...state.transactions.map(t => t.id)) + 1
        : 1;

      state.transactions.unshift({
        ...action.payload,
        id: nextId,
      });
    },

    updateTransaction: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Transaction> }>
    ) => {
      const transaction = state.transactions.find(t => t.id === action.payload.id);
      if (transaction) {
        Object.assign(transaction, action.payload.updates);
      }
    },

    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  // ============ EXTRA REDUCERS (para async thunks) ============
  extraReducers: (builder) => {
    // fetchTransactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // addTransactionAsync
    builder
      .addCase(addTransactionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransactionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(addTransactionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // updateTransactionAsync
    builder
      .addCase(updateTransactionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransactionAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateTransactionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // deleteTransactionAsync
    builder
      .addCase(deleteTransactionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTransactionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchTransactionById
    builder
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTransaction, updateTransaction, deleteTransaction, clearError } = transactionSlice.actions;
export default transactionSlice.reducer;
