"use client";

import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/views/DashboardView';
import { TransactionsView } from '@/components/views/TransactionView';
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
    <div className="min-h-screen bg-primary-100-on-light">
      <Header
        accountName='Bem vindo, Alisson'
        accountNumber='**** 4892'
        status='Ativo'
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
