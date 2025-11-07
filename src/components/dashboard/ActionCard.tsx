"use client";

import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export function ActionCard({ icon, title, description, onClick }: ActionCardProps) {
  return (
    <Card 
      variant="outline"
      className="
        hover:shadow-level-2 transition-shadow cursor-pointer
      "
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="
          p-2 rounded-lg
          bg-primary-primary-50-on-light dark:bg-primary-primary-950-on-dark
        ">
          {icon}
        </div>
        <div>
          <h3 className="
            font-semibold
            text-primary-1200-on-light dark:text-primary-100-on-dark
          ">
            {title}
          </h3>
          <p className="
            text-sm mt-1
            text-primary-600-on-light dark:text-primary-400-on-dark
          ">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
