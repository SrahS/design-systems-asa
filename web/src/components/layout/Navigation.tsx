"use client";

import { Badge } from '@/components/ui/Badge';
import { useTab } from '@/contexts/TabContext';
import { TabType } from '@/types/tabTypes';

interface NavItem {
  label: TabType;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard' as TabType },
  { label: 'Transações' as TabType },
  { label: 'Configurações' as TabType },
];

export function Navigation() {
  const { activeTab, setActiveTab } = useTab();

  const textNormalClass = 'text-neutral-600-on-light';
  const textHoverClass = 'hover:text-neutral-900-on-light';
  const textActiveClass = 'text-primary-1200-on-light';
  const borderActiveClass = 'border-color-primary-900-on-light';

  return (
    <nav
      aria-label="Navegação principal"
      className="flex gap-4 sm:gap-6 border-color-neutral-200-on-light overflow-x-auto"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.label;
        const isDisabled = item.badge === 'Em breve';

        return (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            disabled={isDisabled}
            aria-current={isActive ? 'page' : undefined}
            className={`
              min-h-[48px] px-4 py-3 text-base font-medium font-family-sans border-b-2 transition-all 
              flex items-center gap-2 whitespace-nowrap
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${isActive
                ? `${borderActiveClass} ${textActiveClass}`
                : `border-transparent ${textNormalClass} ${textHoverClass}`
              }
            `}
          >
            {item.label}
            {item.badge && (
              <Badge variant="outline" aria-hidden="true">
                {item.badge}
              </Badge>
            )}
          </button>
        );
      })}
    </nav>
  );
}