"use client";

import { X } from 'lucide-react';
import { Transaction, transactionType, transactionTypes } from '@/types';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  if (!isOpen || !transaction) return null;

  const formattedDate = new Date(transaction.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Detalhes da Transação</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Transaction Type Badge */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Tipo</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                transaction.type === transactionTypes.Deposit
                  ? 'bg-green-100 text-green-800'
                  : transaction.type === transactionTypes.Withdrawal
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {transaction.type}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Descrição</p>
            <p className="text-gray-900 font-medium">{transaction.name}</p>
          </div>

          {/* Amount */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Valor</p>
            <p
              className={`text-2xl font-bold ${
                transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.amount >= 0 ? '+' : ''}R$
              {Math.abs(transaction.amount).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Date */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Data</p>
            <p className="text-gray-900">{formattedDate}</p>
          </div>

          {/* Reference */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Referência</p>
            <p className="text-gray-900 font-mono text-sm">{transaction.reference}</p>
          </div>

          {/* Details */}
          {transaction.description && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Detalhes Adicionais</p>
              <p className="text-gray-900">{transaction.description}</p>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
