"use client";

import { Header } from '@/components/layout/Header';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { mockAccount, mockMetrics, mockTransactions } from '@/data/mockData';
import { Plus, List } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        accountName={mockAccount.name}
        accountNumber={mockAccount.number}
        status={mockAccount.status}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Balance Card */}
        <div className="mb-6">
          <BalanceCard account={mockAccount} />
        </div>

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
            title="New Transaction"
            description="Add a deposit, withdrawal, or transfer"
            onClick={() => console.log('New transaction clicked')}
          />
          <ActionCard
            icon={<List className="w-6 h-6 text-blue-600" />}
            title="View All Transactions"
            description="See your complete transaction history"
            onClick={() => console.log('View all transactions clicked')}
          />
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <TransactionList transactions={mockTransactions} />
        </div>
      </main>
    </div>
  );
}
