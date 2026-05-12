'use client';

import { formatCurrency } from '@/lib/formatters';
import { Transaction } from '@/types';
import { groupByType } from '@/utils/transactions';
import type { TooltipProps } from 'recharts';
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

const COLORS = ['#2D5FC5', '#F7965B', '#36CEC3'];

type Props = { transactions: Transaction[] };


function CurrencyTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        rounded-xl border border-neutral-200/80 bg-white px-3 py-2
        shadow-[0_10px_25px_rgba(15,23,42,0.10)]
      "
    >
      {label ? (
        <p className="text-xs font-medium text-neutral-700">{label}</p>
      ) : null}

      <div className="mt-1 space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-xs text-neutral-500">{p.name}</span>
            <span className="text-xs font-semibold text-neutral-900">
              {formatCurrency(p.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        rounded-xl border border-neutral-200/80 bg-white px-3 py-2
        shadow-[0_10px_25px_rgba(15,23,42,0.10)]
      "
    >
      {label ? (
        <p className="text-xs font-medium text-neutral-700">{label}</p>
      ) : null}

      <div className="mt-1 space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-xs text-neutral-500">{p.name}</span>
            <span className="text-xs font-semibold text-neutral-900">
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
          rounded-2xl border border-neutral-200/70 bg-white
          shadow-[0_6px_18px_rgba(15,23,42,0.06)]
        "
      >
        <div className="p-5">
          <h3 className="text-sm font-semibold text-neutral-900">
            Volume por tipo
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
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
                  stroke="transparent"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip content={<CurrencyTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="
          rounded-2xl border border-neutral-200/70 bg-white
          shadow-[0_6px_18px_rgba(15,23,42,0.06)]
        "
      >
        <div className="p-5">
          <h3 className="text-sm font-semibold text-neutral-900">
            Quantidade por tipo
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
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
                  className="text-xs"
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                />
                <Tooltip content={<CountTooltip />} />

                <Bar
                  dataKey="count"
                  fill="#2D5FC5"
                  radius={3}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
