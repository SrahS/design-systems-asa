export interface Account {
  name: string;
  number: string;
  routing: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  balance: number;
}

export interface Metrics {
  income: MetricData;
  expenses: MetricData;
  netChange: MetricData;
}

export interface MetricData {
  label: string;
  amount: number;
  type: 'positive' | 'negative' | 'neutral';
}
