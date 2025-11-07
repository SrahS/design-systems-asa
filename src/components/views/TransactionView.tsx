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
          <h1 className="
            text-2xl font-bold 
            text-neutral-1200-on-light
          ">
            Todas as Transações
          </h1>
          
          <div className="flex gap-3">
            <button className="
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
              border border-color-neutral-300-on-light
              hover:bg-neutral-200-on-light
              text-neutral-900-on-light
            ">
              <Search className="
                w-4 h-4 
                text-neutral-700-on-light 
              " />
              Pesquisar
            </button>
            
            <button className="
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
              border border-color-neutral-300-on-light
              hover:bg-neutral-200-on-light
              text-neutral-900-on-light
            ">
              <Filter className="
                w-4 h-4 
                text-neutral-700-on-light 
              " />
              Filtrar
            </button>
            
            <button
              onClick={handleNewTransaction}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                bg-primary-900-on-light 
                hover:bg-primary-800-on-light 
                text-white
              "
            >
              <Plus className="w-4 h-4" />
              Adicionar Transação
            </button>
          </div>
        </div>

        <div className="
          rounded-lg p-6 
          bg-white
          border border-neutral-200-on-light
        ">
          <h2 className="
            text-lg font-semibold mb-4
            text-neutral-900-on-light
          ">
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
