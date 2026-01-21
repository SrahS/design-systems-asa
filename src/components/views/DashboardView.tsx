"use client";

import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { Plus, List } from 'lucide-react';
import { useTransactions } from '@/store/hooks';
import { useTab } from '@/contexts/TabContext';
import { useState, useEffect } from 'react';
import { TransactionModal } from '@/components/modals/TransactionModal';
import { TransactionDetailsModal } from '@/components/modals/TransactionDetailsModal';
import { TransactionTypeCharts } from '@/components/dashboard/TransactionTypeCharts';
import { Transaction } from '@/types';
import { mockAccount } from '@/data/mockData';


export function DashboardView() {
  const { 
    transactions, 
    balance, 
    income, 
    expenses, 
    deleteTransaction,
    fetchTransactions,
    loading,
    error 
  } = useTransactions();
  const { setActiveTab } = useTab();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Buscar transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, []);

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

  // Handler para deletar com confirmação
  const handleDeleteTransaction = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta transação?')) {
      await deleteTransaction(id);
    }
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

  // Mostrar erro se houver
  if (error) {
    return (
      <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">
          Erro ao carregar transações: {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Loading skeleton ou conteúdo */}
        {loading && transactions.length === 0 ? (
          <div className="flex items-center justify-center p-12">
            <p className="text-neutral-500">Carregando transações...</p>
          </div>
        ) : (
          <>
            <TransactionTypeCharts transactions={transactions} />
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
                      text-primary-800-on-light 
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
                      text-primary-800-on-light 
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
                  text-neutral-1000-on-light
                ">
                  Atividade Recente
                </h2>
                <button 
                  onClick={handleViewAllTransactions}
                  className="
                    text-sm font-medium transition-colors
                    text-primary-900-on-light 
                    hover:text-primary-800-on-light 
                  "
                >
                  Ver Todas
                </button>
              </div>
              {recentTransactions.length > 0 ? (
                <TransactionList
                  transactions={recentTransactions}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTransaction}
                  onViewDetails={handleViewDetails}
                />
              ) : (
                <p className="text-center text-neutral-500 py-8">
                  Nenhuma transação encontrada
                </p>
              )}
            </div>
          </>
        )}
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
