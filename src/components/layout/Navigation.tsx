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
  const textNormalClass = 'text-neutral-600-on-light';
  const textHoverClass = 'hover:text-neutral-900-on-light';

  const textActiveClass = 'text-primary-1200-on-light';
  const borderActiveClass = 'border-color-primary-900-on-light';

  return (
    <nav className="
      flex gap-6 
      border-color-neutral-200-on-light dark:border-color-neutral-800-on-dark
    ">
      {navItems.map((item) => {
        const isActive = activeTab === item.label;
        const isDisabled = item.badge === 'Em breve';

        return (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            disabled={isDisabled}
            className={`
              px-4 py-3 text-sm font-family-sans border-b-2 transition-colors flex items-center gap-2 
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${
                isActive
                  ? `border-b-2 ${borderActiveClass} ${textActiveClass}`
                  : `border-transparent ${textNormalClass} ${textHoverClass}`
              }
            `}
          >
            {item.label}
            {item.badge && (
              <Badge variant="soon">
                {item.badge}
              </Badge>
            )}
          </button>
        );
      })}
    </nav>
  );
}
