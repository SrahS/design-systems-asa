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
            text-color-neutral-900-on-light
            dark:text-color-neutral-50-on-dark
          ">
            Todas as Transações
          </h1>
          
          <div className="flex gap-3">
            <button className="
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
              border border-color-neutral-300-on-light dark:border-color-neutral-700-on-dark
              bg-white dark:bg-color-neutral-950-on-dark
              hover:bg-color-neutral-100-on-light dark:hover:bg-color-neutral-900-on-dark
              text-color-neutral-900-on-light dark:text-color-neutral-100-on-dark
            ">
              <Search className="
                w-4 h-4 
                text-color-neutral-700-on-light 
                dark:text-color-neutral-300-on-dark
              " />
              Pesquisar
            </button>
            
            <button className="
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
              border border-color-neutral-300-on-light dark:border-color-neutral-700-on-dark
              bg-white dark:bg-color-neutral-950-on-dark
              hover:bg-color-neutral-100-on-light dark:hover:bg-color-neutral-900-on-dark
              text-color-neutral-900-on-light dark:text-color-neutral-100-on-dark
            ">
              <Filter className="
                w-4 h-4 
                text-color-neutral-700-on-light 
                dark:text-color-neutral-300-on-dark
              " />
              Filtrar
            </button>
            
            <button
              onClick={handleNewTransaction}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                bg-color-primary-800-on-light 
                hover:bg-color-primary-900-on-light 
                dark:bg-color-primary-dark-600-on-dark
                dark:hover:bg-color-primary-dark-700-on-dark
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
          bg-white dark:bg-color-neutral-950-on-dark
          border border-color-neutral-200-on-light dark:border-color-neutral-900-on-dark
        ">
          <h2 className="
            text-lg font-semibold mb-4
            text-color-neutral-900-on-light dark:text-color-neutral-100-on-dark
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
