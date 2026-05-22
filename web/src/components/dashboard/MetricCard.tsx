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
    ? 'bg-category-deposit-icon-bg border-category-deposit-icon-border text-green-700'
    : metric.type === 'negative'
      ? 'bg-category-withdraw-icon-bg border-category-withdraw-icon-border text-red-700'
      : 'bg-category-transfer-icon-bg border-category-transfer-icon-border text-blue-700';

  const valueColor = metric.type === 'positive'
    ? 'text-green-700'
    : metric.type === 'negative'
      ? 'text-red-700'
      : 'text-gray-900';

  return (
    <Card variant="surface-2" padding="lg" className="border border-gray-200">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-lg font-medium text-gray-600">
            {metric.label}
          </p>
          <p className={`mt-2 text-3xl md:text-4xl font-bold leading-tight tracking-tight ${valueColor}`}>
            {metric.amount >= 0 ? '+' : '-'} R$ {Math.abs(metric.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`
            inline-flex h-14 w-14 shrink-0 items-center justify-center
            rounded-xl border-2
            ${iconWrapperClass}
          `}
        >
          <Icon className="h-7 w-7" />
        </span>
      </div>
    </Card>
  );
}