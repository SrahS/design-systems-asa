"use client";

import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { Plus, List } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { useTab } from '@/contexts/TabContext';
import { useState } from 'react';
import { TransactionModal } from '@/components/modals/TransactionModal';
import { TransactionDetailsModal } from '@/components/modals/TransactionDetailsModal';
import { Transaction } from '@/types';
import { mockAccount } from '@/data/mockData';

export function DashboardView() {
  const { transactions, balance, income, expenses, deleteTransaction } = useTransactions();
  const { setActiveTab } = useTab();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const recentTransactions = transactions.slice().reverse().slice(0, 3);

  const dynamicAccount = {
    ...mockAccount,
    balance,
  };

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

    const handleViewAllTransactions = () => {
    setActiveTab('Transações');
  };

  const mockMetrics = {
    income: {
      label: 'Renda deste mês',
      amount: income,
      type: 'positive' as const,
    },
    expenses: {
      label: 'Despesas deste mês',
      amount: -expenses,
      type: 'negative' as const,
    },
    netChange: {
      label: 'Mudança Líquida',
      amount: balance,
      type: 'neutral' as const,
    },
  };

  return (
    <>
      <div className="space-y-6">

        <BalanceCard account={dynamicAccount} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard metric={mockMetrics.income} />
          <MetricCard metric={mockMetrics.expenses} />
          <MetricCard metric={mockMetrics.netChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard
            icon={
              <Plus 
                className="
                  w-6 h-6 
                  text-color-primary-800-on-light 
                  dark:text-color-primary-dark-700-on-dark
                " 
              />
            }
            title="Nova Transação"
            description="Adicionar um depósito, saque ou transferência"
            onClick={handleNewTransaction}
          />
          <ActionCard
            icon={
              <List 
                className="
                  w-6 h-6 
                  text-color-primary-800-on-light 
                  dark:text-color-primary-dark-700-on-dark
                " 
              />
            }
            title="Ver Todas as Transações"
            description="Veja seu histórico completo de transações"
            onClick={handleViewAllTransactions}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="
              text-xl font-bold 
              text-color-neutral-900-on-light
              dark:text-color-neutral-100-on-dark
            ">
              Atividade Recente
            </h2>
            <button 
              className="
                text-sm font-medium transition-colors
                text-color-primary-600-on-light 
                hover:text-color-primary-700-on-light 
                dark:text-color-primary-dark-400-on-dark 
                dark:hover:text-color-primary-default-on-dark
              "
            >
              Ver Todas
            </button>
          </div>
          <TransactionList
            transactions={recentTransactions}
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
