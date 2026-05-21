'use client';

import { formatCurrency } from '@/lib/formatters';
import { Transaction } from '@/types';
import { groupByType } from '@/utils/transactions';
import { tokens } from '@/design-system/theme/tokens';
import type { TooltipContentProps } from 'recharts';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

/**
 * Paleta dos charts derivada do tema (paridade com o app):
 * - Depósito  → primary (roxo)
 * - Saque     → cyan
 * - Transferência → warning (amarelo/laranja)
 *
 * Mantemos um array indexado como fallback para tipos não mapeados.
 */
const TYPE_COLORS: Record<string, string> = {
  Deposito: tokens.colors.primary,
  Saque: tokens.colors.cyan,
  Transferência: tokens.colors.warning,
};

const FALLBACK_COLORS = [
  tokens.colors.primary,
  tokens.colors.cyan,
  tokens.colors.warning,
];

const colorForType = (type: string, index: number) =>
  TYPE_COLORS[type] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];

type Props = { transactions: Transaction[] };


function CurrencyTooltip({ active, payload, label }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        rounded-md border border-pill-stroke bg-surface-3 px-3 py-2
        shadow-lift
      "
    >
      {label ? (
        <p className="text-xs font-medium text-text-muted">{label}</p>
      ) : null}

      <div className="mt-1 space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-xs text-text-subtle">{p.name}</span>
            <span className="text-xs font-semibold text-text">
              {formatCurrency(p.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountTooltip({ active, payload, label }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        rounded-md border border-pill-stroke bg-surface-3 px-3 py-2
        shadow-lift
      "
    >
      {label ? (
        <p className="text-xs font-medium text-text-muted">{label}</p>
      ) : null}

      <div className="mt-1 space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-xs text-text-subtle">{p.name}</span>
            <span className="text-xs font-semibold text-text">
              {p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TransactionTypeCharts({ transactions }: Props) {
  const data = groupByType(transactions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div
        className="
          rounded-xl border border-pill-stroke bg-surface-2
          shadow-soft
        "
      >
        <div className="p-5">
          <h3 className="text-md font-semibold text-text">
            Volume por tipo
          </h3>
          <p className="mt-1 text-xs text-text-muted">
            Soma absoluta por categoria
          </p>
        </div>

        <div className="px-5 pb-5">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="totalAbs"
                  nameKey="type"
                  outerRadius={88}
                  stroke={tokens.colors.surface}
                  strokeWidth={2}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={colorForType(entry.type, i)} />
                  ))}
                </Pie>

                <Tooltip
                  content={<CurrencyTooltip />}
                  cursor={{ fill: tokens.colors.pill }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="
          rounded-xl border border-pill-stroke bg-surface-2
          shadow-soft
        "
      >
        <div className="p-5">
          <h3 className="text-md font-semibold text-text">
            Quantidade por tipo
          </h3>
          <p className="mt-1 text-xs text-text-muted">
            Número de transações
          </p>
        </div>

        <div className="px-5 pb-5">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barCategoryGap={18}>
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: tokens.colors.textMuted, fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: tokens.colors.textSubtle, fontSize: 12 }}
                />
                <Tooltip
                  content={<CountTooltip />}
                  cursor={{ fill: tokens.colors.pill }}
                />

                <Bar
                  dataKey="count"
                  radius={3}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={colorForType(entry.type, i)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
