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
      className="p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
}
