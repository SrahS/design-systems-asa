"use client";

import { Badge } from '@/components/ui/Badge';
import { useTab } from '@/contexts/TabContext';
import { TabType } from '@/types/tabTypes';

interface NavItem {
  label: TabType;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard' },
  { label: 'Transações' },
  { label: 'Configurações', badge: 'Em breve' },
];

export function Navigation() {
  const { activeTab, setActiveTab } = useTab();

  return (
    <nav className="flex gap-6 border-b border-gray-200">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActiveTab(item.label)}
          disabled={item.badge === 'Em breve'}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === item.label
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          } ${item.badge === 'Soon' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {item.label}
          {item.badge && (
            <Badge variant="soon">
              {item.badge}
            </Badge>
          )}
        </button>
      ))}
    </nav>
  );
}
