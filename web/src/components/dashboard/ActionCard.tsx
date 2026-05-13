"use client";

import { ReactNode } from 'react';
import { Card } from '@/design-system/components/Card';

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
      className="group hover:shadow-lift"
    >
      <div className="flex items-start gap-4">
        <div
          className="
            inline-flex h-10 w-10 shrink-0 items-center justify-center
            rounded-md border border-category-deposit-icon-border
            bg-category-deposit-icon-bg text-primary
            transition-colors duration-150
            group-hover:bg-category-deposit-card
          "
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-md font-semibold text-text">
            {title}
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
