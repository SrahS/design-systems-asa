"use client";

import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/views/DashboardView';
import { TransactionsView } from '@/components/views/TransactionView';
import { mockAccount, mockMetrics, mockTransactions } from '@/data/mockData';
import { useTab } from '@/contexts/TabContext';
import { TabConst } from '@/types/tabTypes';

export default function Home() {
  const { activeTab } = useTab();

  const renderContent = () => {
    switch (activeTab) {
      case TabConst.Dashboard:
        return <DashboardView />;
      case TabConst.Transactions:
        return <TransactionsView />;
      default:
        return <DashboardView />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        accountName={mockAccount.name}
        accountNumber={mockAccount.number}
        status={mockAccount.status}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
