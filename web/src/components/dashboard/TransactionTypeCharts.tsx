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
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-surface-2 p-8 text-center">
          <p className="text-lg font-medium text-gray-600">Nenhuma transação encontrada neste período.</p>
        </div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="
              flex flex-col sm:flex-row sm:items-center justify-between gap-4
              rounded-xl border border-gray-200 bg-white p-5 shadow-sm
              transition-colors duration-150 hover:bg-gray-50
            "
          >
            <div className="flex flex-1 items-center gap-4 min-w-0">
              <div
                className="
                  inline-flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-full bg-blue-100 text-blue-700
                "
                aria-hidden="true"
              >
                <span className="text-xl font-bold">
                  {transaction.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-gray-900">
                  {transaction.name}
                </p>
                <p className="mt-1 truncate text-base text-gray-600">
                  {transaction.date} • {transaction.reference}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p
                  className={`text-xl font-bold ${transaction.amount >= 0 ? 'text-green-700' : 'text-red-700'
                    }`}
                >
                  {transaction.amount >= 0 ? '+' : '-'} R$
                  {Math.abs(transaction.amount).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-500">{transaction.type}</p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  onClick={() => onViewDetails?.(transaction)}
                  className="
                    flex-1 sm:flex-none inline-flex min-h-[48px] px-4 items-center justify-center gap-2
                    rounded-lg border border-gray-300 bg-white text-blue-700 font-medium text-base
                    transition-colors hover:bg-blue-50 focus:ring-4 focus:ring-blue-200
                  "
                  title="Ver detalhes da transação"
                >
                  <Eye className="h-5 w-5" />
                  <span className="sm:hidden lg:inline">Detalhes</span>
                </button>

                <button
                  onClick={() => onEdit?.(transaction)}
                  className="
                    flex-1 sm:flex-none inline-flex min-h-[48px] px-4 items-center justify-center gap-2
                    rounded-lg border border-gray-300 bg-white text-gray-700 font-medium text-base
                    transition-colors hover:bg-gray-100 focus:ring-4 focus:ring-gray-200
                  "
                  title="Editar transação"
                >
                  <Edit className="h-5 w-5" />
                  <span className="sm:hidden lg:inline">Editar</span>
                </button>

                <button
                  onClick={() => onDelete?.(transaction.id)}
                  className="
                    flex-1 sm:flex-none inline-flex min-h-[48px] px-4 items-center justify-center gap-2
                    rounded-lg border border-red-200 bg-red-50 text-red-700 font-medium text-base
                    transition-colors hover:bg-red-100 focus:ring-4 focus:ring-red-200
                  "
                  title="Excluir transação"
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sm:hidden lg:inline">Excluir</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}