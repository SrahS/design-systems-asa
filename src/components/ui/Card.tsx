"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div 
      className={cn('rounded-lg bg-white shadow-sm', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
