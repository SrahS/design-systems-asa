"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Transaction, transactionType, transactionTypes } from "@/types";
import { useTransactions } from "@/contexts/TransactionContext";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { addTransaction, updateTransaction } = useTransactions();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: transactionTypes.Deposit as transactionType,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        name: transaction.name,
        amount: Math.abs(transaction.amount).toString(),
        type: transaction.type,
        description: transaction.description || "",
        date: transaction.date,
      });
    } else {
      setFormData({
        name: "",
        amount: "",
        type: transactionTypes.Deposit,
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [transaction, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount =
      formData.type === transactionTypes.Deposit
        ? parseFloat(formData.amount)
        : -parseFloat(formData.amount);

    if (transaction) {
      updateTransaction(transaction.id, {
        name: formData.name,
        amount,
        type: formData.type,
        description: formData.description,
        date: formData.date,
      });
    } else {
      addTransaction({
        name: formData.name,
        amount,
        type: formData.type,
        description: formData.description,
        date: formData.date,
        reference: "Ref",
      });
    }

    onClose();
  };

  if (!isOpen) return null;
  const isEditing = !!transaction;

  const labelClass =
    "block text-xs font-medium text-neutral-700-on-light mb-1.5";

  const inputClassNames = `
    w-full rounded-lg px-3 py-2 text-sm
    border border-neutral-200-on-light bg-white
    text-neutral-900-on-light placeholder:text-neutral-500-on-light
    outline-none
    focus:ring-2 focus:ring-primary-200-on-light focus:border-primary-400-on-light
    transition-colors
  `;

  return (
    <div
      className="
        fixed inset-0 z-50 p-4
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? "Editar transação" : "Nova transação"}
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl bg-white
          border border-neutral-200/70
          shadow-[0_18px_55px_rgba(15,23,42,0.18)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-neutral-200/70">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-neutral-1200-on-light">
              {isEditing ? "Editar Transação" : "Nova Transação"}
            </h2>
            <p className="mt-1 text-xs text-neutral-600-on-light">
              Preencha os campos abaixo para {isEditing ? "atualizar" : "criar"}.
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
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelClass}>Tipo de Transação</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={inputClassNames}
            >
              <option value={transactionTypes.Deposit}>Depósito</option>
              <option value={transactionTypes.Withdrawal}>Saque</option>
              <option value={transactionTypes.Transfer}>Transferência</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Descrição</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ex: Salário, Compras de Supermercado"
              className={inputClassNames}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Valor</label>
            <div className="relative">
              <span
                className="
                  absolute left-3 top-1/2 -translate-y-1/2
                  text-sm text-neutral-500-on-light
                "
              >
                R$
              </span>
              <input
                type="number"
                inputMode="decimal"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0,00"
                step="0.01"
                className={`${inputClassNames} pl-9`}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Data</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClassNames}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Detalhes Adicionais (opcional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Adicione quaisquer notas adicionais..."
              rows={3}
              className={`${inputClassNames} resize-none`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 px-4 py-2.5 rounded-lg text-sm font-medium
                border border-neutral-200-on-light
                text-neutral-800-on-light
                hover:bg-neutral-200-on-light
                transition-colors
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold
                bg-primary-900-on-light text-white
                hover:bg-primary-800-on-light
                transition-colors
              "
            >
              {isEditing ? "Atualizar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
