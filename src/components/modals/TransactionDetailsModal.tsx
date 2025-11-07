"use client";

import { X } from 'lucide-react';
import { Transaction, transactionType, transactionTypes } from '@/types';
import { cn } from '@/lib/utils';

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

  const getTypeClasses = (type: transactionType) => {
    switch (type) {
      case transactionTypes.Deposit:
        return 'bg-primary-semantic-success-100-on-light text-semantic-success-900-on-light dark:bg-primary-semantic-success-900-on-dark dark:text-semantic-success-200-on-dark';
      case transactionTypes.Withdrawal:
        return 'bg-primary-semantic-error-100-on-light text-semantic-error-900-on-light dark:bg-primary-semantic-error-900-on-dark dark:text-semantic-error-200-on-dark';
      case transactionTypes.Transfer:
      default:
        return 'bg-primary-primary-100-on-light text-primary-1200-on-light dark:bg-primary-primary-960-on-dark dark:text-primary-dark-300-on-dark';
    }
  };
  
  const amountColorClass = transaction.amount >= 0
    ? 'text-semantic-success-600-on-light dark:text-semantic-success-500-on-dark'
    : 'text-semantic-error-600-on-light dark:text-semantic-error-500-on-dark';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="
        rounded-lg shadow-xl max-w-md w-full mx-4
        bg-white dark:bg-primary-neutral-950-on-dark
      ">

        <div className="
          flex items-center justify-between border-b p-6
          border-color-neutral-200-on-light dark:border-color-neutral-900-on-dark
        ">
          <h2 className="
            text-xl font-bold 
            text-neutral-900-on-light dark:text-neutral-100-on-dark
          ">
            Detalhes da Transação
          </h2>
          <button
            onClick={onClose}
            className="
              text-neutral-500-on-light dark:text-neutral-400-on-dark
              hover:text-neutral-700-on-light dark:hover:text-neutral-200-on-dark
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          <div>
            <p className="
              text-sm mb-1 
              text-neutral-600-on-light dark:text-neutral-400-on-dark
            ">
              Tipo
            </p>
            <span
              className={cn(
                'inline-block px-3 py-1 rounded-full text-sm font-family-sans',
                getTypeClasses(transaction.type)
              )}
            >
              {transaction.type}
            </span>
          </div>

          {Object.entries({
            'Descrição': transaction.name,
            'Valor': (
                <p className={cn("text-2xl font-bold", amountColorClass)}>
                    {transaction.amount >= 0 ? '+' : ''}R$
                    {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
            ),
            'Data': formattedDate,
            'Referência': <p className="font-mono text-sm">{transaction.reference}</p>,
            'Detalhes Adicionais': transaction.description,
          }).map(([label, value]) => {
            if (!value) return null;
            
            const isText = typeof value === 'string';
            
            return (
              <div key={label}>
                <p className="
                  text-sm mb-1 
                  text-neutral-600-on-light dark:text-neutral-400-on-dark
                ">
                  {label}
                </p>
                {isText ? (
                  <p className="
                    text-neutral-900-on-light dark:text-neutral-100-on-dark font-family-sans
                  ">
                    {value}
                  </p>
                ) : (
                    value
                )}
              </div>
            );
          })}
          
          <button
            onClick={onClose}
            className="w-full mt-6 px-4 py-2 bg-primary-primary-600-on-light text-white rounded-lg hover:bg-primary-primary-700-on-light"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
