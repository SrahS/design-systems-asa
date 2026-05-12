import { Transaction } from '@/types';

export function groupByType(transactions: Transaction[]) {
  const map = new Map<string, { type: string; count: number; totalSigned: number; totalAbs: number }>();

  for (const t of transactions) {
    const key = t.type;
    const prev = map.get(key) ?? { type: key, count: 0, totalSigned: 0, totalAbs: 0 };

    const next = {
      ...prev,
      count: prev.count + 1,
      totalSigned: prev.totalSigned + t.amount,
      totalAbs: prev.totalAbs + Math.abs(t.amount),
    };

    map.set(key, next);
  }

  return Array.from(map.values());
}
