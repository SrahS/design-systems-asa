"use client";

import { ReactNode } from 'react';
import { Card } from '@/design-system/components/Card';
import { ChevronRight } from 'lucide-react';

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export function ActionCard({ icon, title, description, onClick }: ActionCardProps) {
  return (
    <Card
      variant="surface-2"
      padding="lg"
      interactive
      onClick={onClick}
      role="button"
      aria-label={`${title}: ${description}`}
      className="group hover:shadow-md transition-all duration-200 border border-gray-200"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="
              inline-flex h-14 w-14 shrink-0 items-center justify-center
              rounded-xl border-2 border-category-deposit-icon-border
              bg-category-deposit-icon-bg text-primary
              transition-colors duration-150 group-hover:bg-category-deposit-card
            "
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-gray-900">
              {title}
            </h3>
            <p className="mt-1 text-base text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="text-gray-400 group-hover:text-primary transition-colors">
          <ChevronRight className="h-8 w-8" />
        </div>
      </div>
    </Card>
  );
}