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
          bg-primary-50-on-light
        ">
          {icon}
        </div>
        <div>
          <h3 className="
            font-semibold
            text-primary-1200-on-ligh
          ">
            {title}
          </h3>
          <p className="
            text-sm mt-1
            text-primary-800-on-light
          ">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
