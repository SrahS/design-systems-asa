"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';

interface NavItem {
  label: string;
  active?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', active: true },
  { label: 'Transações', active: false },
  { label: 'Configurações', active: false, badge: 'Em breve' },
];

export function Navigation() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <nav className="flex gap-6 border-b border-gray-200">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActiveTab(item.label)}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === item.label
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          disabled={!!item.badge}
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
