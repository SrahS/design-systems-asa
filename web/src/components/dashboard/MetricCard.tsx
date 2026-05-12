import { MetricData } from '@/types';
import { Card } from '@/components/ui/Card';
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

  const bgColor = metric.type === 'positive'
    ? 'bg-semantic-success-100-on-light'
    : metric.type === 'negative'
    ? 'bg-semantic-error-100-on-light'
    : 'bg-semantic-warning-100-on-light';

  const iconColor = metric.type === 'positive'
    ? 'text-semantic-success-900-on-light'
    : metric.type === 'negative'
    ? 'text-semantic-error-900-on-light'
    : 'text-semantic-warning-100-on-light';

    const valueColor = metric.type === 'positive'
    ? 'text-semantic-success-900-on-light'
    : metric.type === 'negative'
    ? 'text-semantic-error-900-on-light'
    : 'text-semantic-warning-900-on-light';

  return (
    <Card className={`${bgColor} p-4 border-0`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-primary-1200-on-light">{metric.label}</p>
          <p className={`text-2xl font-bold mt-1 ${valueColor}`}>
            {metric.amount >= 0 ? '+' : '-'}R$ {Math.abs(metric.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Icon className={`${iconColor} w-5 h-5`} />
      </div>
    </Card>
  );
}
