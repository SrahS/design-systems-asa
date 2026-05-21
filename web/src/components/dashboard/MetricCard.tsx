import { MetricData } from '@/types';
import { Card } from '@/design-system/components/Card';
import { ArrowUp, ArrowDown, FileText } from 'lucide-react';

interface MetricCardProps {
  metric: MetricData;
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.type === 'positive'
    ? ArrowUp
    : metric.type === 'negative'
    ? ArrowDown
    : FileText;

  const iconWrapperClass = metric.type === 'positive'
    ? 'bg-category-deposit-icon-bg border-category-deposit-icon-border text-success'
    : metric.type === 'negative'
    ? 'bg-category-withdraw-icon-bg border-category-withdraw-icon-border text-danger'
    : 'bg-category-transfer-icon-bg border-category-transfer-icon-border text-cyan';

  const valueColor = metric.type === 'positive'
    ? 'text-success'
    : metric.type === 'negative'
    ? 'text-danger'
    : 'text-text';

  return (
    <Card variant="surface-2" padding="lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-text-muted">
            {metric.label}
          </p>
          <p className={`mt-2 text-xxl font-bold leading-none tracking-tight ${valueColor}`}>
            {metric.amount >= 0 ? '+' : '-'}R$ {Math.abs(metric.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`
            inline-flex h-9 w-9 shrink-0 items-center justify-center
            rounded-md border
            ${iconWrapperClass}
          `}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Card>
  );
}
