"use client";

import { X } from "lucide-react";
import { Transaction, transactionType, transactionTypes } from "@/types";
import { cn } from "@/lib/utils";

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

  const formattedDate = new Date(transaction.date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getTypeClasses = (type: transactionType) => {
    switch (type) {
      case transactionTypes.Deposit:
        return "bg-semantic-success-100-on-light text-semantic-success-900-on-light";
      case transactionTypes.Withdrawal:
        return "bg-semantic-error-100-on-light text-semantic-error-900-on-light";
      case transactionTypes.Transfer:
        return "bg-semantic-error-100-on-light text-semantic-error-900-on-light";
      default:
        return "bg-primary-100-on-light text-primary-1200-on-light";
    }
  };

  const amountColorClass =
    transaction.amount >= 0
      ? "text-semantic-success-600-on-light"
      : "text-semantic-error-600-on-light";

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4
      "
      role="dialog"
      aria-modal="true"
      aria-label="Detalhes da transação"
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-lg
          rounded-2xl bg-white
          border border-neutral-200/70
          shadow-[0_18px_55px_rgba(15,23,42,0.18)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-neutral-200/70">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-neutral-1200-on-light">
              Detalhes da Transação
            </h2>
            <p className="mt-1 text-xs text-neutral-600-on-light">
              Confira as informações completas desta movimentação.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              inline-flex items-center justify-center
              h-9 w-9 rounded-lg
              text-neutral-600-on-light
              hover:bg-neutral-200-on-light hover:text-neutral-900-on-light
              transition-colors
            "
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-neutral-900-on-light">Tipo</p>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-family-sans",
                getTypeClasses(transaction.type)
              )}
            >
              {transaction.type}
            </span>
          </div>

          <div className="rounded-xl border border-neutral-200/70 bg-neutral-50/60 p-4">
            <p className="text-xs text-neutral-600-on-light">Valor</p>
            <p className={cn("mt-1 text-2xl font-bold", amountColorClass)}>
              {transaction.amount >= 0 ? "+" : "-"}R$
              {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-neutral-600-on-light">Descrição</p>
              <p className="text-sm text-neutral-1000-on-light font-family-sans">
                {transaction.name}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-600-on-light">Data</p>
              <p className="text-sm text-neutral-1000-on-light font-family-sans">
                {formattedDate}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-600-on-light">Referência</p>
              <p className="text-sm font-mono text-neutral-1000-on-light break-all">
                {transaction.reference}
              </p>
            </div>

            {transaction.description ? (
              <div className="space-y-1">
                <p className="text-xs text-neutral-600-on-light">Detalhes adicionais</p>
                <p className="text-sm text-neutral-1000-on-light font-family-sans">
                  {transaction.description}
                </p>
              </div>
            ) : null}
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="
                w-full px-4 py-2.5 rounded-lg
                bg-primary-900-on-light text-white
                hover:bg-primary-800-on-light
                transition-colors
              "
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
