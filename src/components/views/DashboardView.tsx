"use client";

import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { mockAccount, mockMetrics, mockTransactions } from '@/data/mockData';
import { Plus, List } from 'lucide-react';

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <BalanceCard account={mockAccount} />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricCard metric={mockMetrics.income} />
        <MetricCard metric={mockMetrics.expenses} />
        <MetricCard metric={mockMetrics.netChange} />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ActionCard
          icon={<Plus className="w-6 h-6 text-blue-600" />}
          title="Nova transação"
          description="Agende um depósito ou uma nova transferência"
          onClick={() => console.log('New transaction clicked')}
        />
        <ActionCard
          icon={<List className="w-6 h-6 text-blue-600" />}
          title="Ver todas as transações"
          description="veja seu histórico completo de transações"
          onClick={() => console.log('View all transactions clicked')}
        />
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Atividade recente</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            ver tudo
          </button>
        </div>
        <TransactionList transactions={mockTransactions} />
      </div>
    </div>
  );
}


