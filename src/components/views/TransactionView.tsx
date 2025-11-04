"use client";

import { TransactionList } from '@/components/dashboard/TransactionList';
import { Search, Filter, Plus } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { useState } from 'react';
import { TransactionModal } from '@/components/modals/TransactionModal';
import { TransactionDetailsModal } from '@/components/modals/TransactionDetailsModal';
import { Transaction } from '@/types';

export function TransactionsView() {
  const { transactions, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState({
    type: 'Todos os tipos',
    status: 'Todos os status',
  });

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleNewTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Todas as Transações</h1>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Search className="w-4 h-4" />
              Pesquisar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
            <button
              onClick={handleNewTransaction}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Adicionar Transação
            </button>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Histórico de Transações ({transactions.length})
          </h2>
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>

      {/* Modals */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </>
  );
}
