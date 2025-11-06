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
    ? 'bg-green-50'
    : metric.type === 'negative'
    ? 'bg-red-50'
    : 'bg-blue-50';

  const iconColor = metric.type === 'positive'
    ? 'text-green-600'
    : metric.type === 'negative'
    ? 'text-red-600'
    : 'text-blue-600';

    const valueColor = metric.type === 'positive'
    ? 'text-green-600'
    : metric.type === 'negative'
    ? 'text-red-600'
    : 'text-blue-600';

  return (
    <Card className={`${bgColor} p-4 border-0`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{metric.label}</p>
          <p className={`text-2xl font-bold mt-1 ${valueColor}`}>
            {metric.amount >= 0 ? '+' : '-'}R$ {Math.abs(metric.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Icon className={`${iconColor} w-5 h-5`} />
      </div>
    </Card>
  );
}
