"use client";

import { Trash2, Edit, Eye } from 'lucide-react';
import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: number) => void;
  onViewDetails?: (transaction: Transaction) => void;
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
  onViewDetails,
}: TransactionListProps) {
  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <div className="rounded-xl border border-stroke bg-surface-2 py-8 text-center">
          <p className="text-text-muted">Nenhuma transação encontrada</p>
        </div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="
              flex items-center justify-between gap-3
              rounded-xl border border-pill bg-surface-2 p-4
              transition-colors duration-150 hover:bg-surface-3
            "
          >
            <div className="flex flex-1 items-center gap-3 min-w-0">
              <div
                className="
                  inline-flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-md border border-stroke bg-pill
                "
              >
                <span className="text-sm font-semibold text-text">
                  {transaction.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text">
                  {transaction.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-text-subtle">
                  {transaction.date} • {transaction.reference}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    transaction.amount >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {transaction.amount >= 0 ? '+' : '-'}R$
                  {Math.abs(transaction.amount).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-0.5 text-xs text-text-subtle">{transaction.type}</p>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2">
                <button
                  onClick={() => onViewDetails?.(transaction)}
                  className="
                    inline-flex h-9 w-9 items-center justify-center
                    rounded-md border border-stroke bg-pill text-cyan
                    transition-opacity duration-150
                    hover:bg-surface-3 active:opacity-pressed-soft
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-primary focus-visible:ring-offset-2
                    focus-visible:ring-offset-background
                  "
                  title="Ver detalhes"
                  aria-label={`Ver detalhes de ${transaction.name}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit?.(transaction)}
                  className="
                    inline-flex h-9 w-9 items-center justify-center
                    rounded-md border border-stroke bg-pill text-text-muted
                    transition-opacity duration-150
                    hover:bg-surface-3 hover:text-text active:opacity-pressed-soft
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-primary focus-visible:ring-offset-2
                    focus-visible:ring-offset-background
                  "
                  title="Editar"
                  aria-label={`Editar ${transaction.name}`}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete?.(transaction.id)}
                  className="
                    inline-flex h-9 w-9 items-center justify-center
                    rounded-md border border-stroke bg-pill text-danger
                    transition-opacity duration-150
                    hover:bg-surface-3 active:opacity-pressed-soft
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-primary focus-visible:ring-offset-2
                    focus-visible:ring-offset-background
                  "
                  title="Excluir"
                  aria-label={`Excluir ${transaction.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
