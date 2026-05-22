"use client";

import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/views/DashboardView';
import { AccessibilityPanel } from '@/components/views/AccessibilityPanel';
import { useTab } from '@/contexts/TabContext';
import { TabConst } from '@/types/tabTypes';
import { TransactionsView } from '@/components/views/TransactionView';

export default function Home() {
  const { activeTab } = useTab();

  const renderContent = () => {
    switch (activeTab) {
      case TabConst.Dashboard:
        return <DashboardView />;
      case TabConst.Transactions:
        return <TransactionsView />;
      case 'Configurações':
        return <AccessibilityPanel />;
      default:
        return <DashboardView />;
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50-on-light">
      <Header
        accountName="Sarah Araújo"
        accountNumber="12345-6"
        status="Ativa"
      />
      <div className="pt-8">
        {renderContent()}
      </div>
    </div>
  );
}