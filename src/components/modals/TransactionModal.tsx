"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Transaction, transactionType, transactionTypes } from "@/types";
import { useTransactions } from "@/contexts/TransactionContext";
import { cn } from "@/lib/utils";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

type FormErrors = Partial<Record<"type" | "name" | "amount" | "date", string>>;

const incomeSuggestions = ["Salário", "Freelance", "Reembolso", "Dividendos", "Rendimento", "Cashback", "Outros"];
const expenseSuggestions = ["Alimentação", "Supermercado", "Transporte", "Moradia", "Saúde", "Lazer", "Educação", "Assinaturas", "Outros"];

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { addTransaction, updateTransaction } = useTransactions();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: transactionTypes.Deposit as transactionType,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});

  const isIncome = formData.type === transactionTypes.Deposit;

  const descriptionSuggestions = useMemo(
    () => (isIncome ? incomeSuggestions : expenseSuggestions),
    [isIncome]
  );

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

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

    setErrors({});
    setTouched({});
  }, [transaction, isOpen]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: "" }));
    setTouched((prev) => ({ ...prev, name: false })); 
  }, [formData.type]);

  const markTouched = (name: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (data = formData): FormErrors => {
    const next: FormErrors = {};

    if (![transactionTypes.Deposit, transactionTypes.Withdrawal, transactionTypes.Transfer].includes(data.type)) {
      next.type = "Tipo de transação inválido.";
    }

    const name = data.name.trim();
    if (name.length < 3) next.name = "Descrição deve ter ao menos 3 caracteres.";
    if (name.length > 60) next.name = "Descrição muito longa (máx. 60 caracteres).";

    const amountRaw = data.amount.trim().replace(",", ".");
    const amountNum = Number(amountRaw);

    if (!amountRaw || !Number.isFinite(amountNum) || amountNum <= 0) {
      next.amount = "Informe um valor maior que 0.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(amountRaw)) {
      next.amount = "Use no máximo 2 casas decimais (ex: 10.50).";
    }

    if (!data.date || Number.isNaN(new Date(data.date).getTime())) {
      next.date = "Data inválida.";
    }

    return next;
  };

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData.name, formData.amount, formData.type, formData.date]);

  const showError = (key: keyof FormErrors) => Boolean(touched[key as any] && errors[key]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setTouched({ type: true, name: true, amount: true, date: true, description: true });

    if (Object.keys(nextErrors).length) return;

    const amountNum = Number(formData.amount.trim().replace(",", "."));
    const amount = formData.type === transactionTypes.Deposit ? amountNum : -amountNum;

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

  const labelClass = "block text-xs font-medium text-neutral-700-on-light mb-1.5";

  const baseInput =
    "w-full rounded-lg px-3 py-2 text-sm border bg-white text-neutral-900-on-light placeholder:text-neutral-500-on-light outline-none transition-colors focus:ring-2 focus:ring-primary-200-on-light focus:border-primary-400-on-light";

  const inputNormal = "border-neutral-200-on-light";
  const inputWithError =
    "border-semantic-error-300-on-light focus:ring-semantic-error-200-on-light focus:border-semantic-error-400-on-light";

  const errorText = "mt-1 text-xs text-semantic-error-700-on-light";

  const datalistId = isIncome ? "income-desc-suggestions" : "expense-desc-suggestions";

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
      onClick={handleBackdropClick}
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl bg-white
          border border-neutral-200/70
          shadow-[0_18px_55px_rgba(15,23,42,0.18)]
        "
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
              onBlur={() => markTouched("type")}
              className={cn(baseInput, showError("type") ? inputWithError : inputNormal)}
            >
              <option value={transactionTypes.Deposit}>Depósito (Receita)</option>
              <option value={transactionTypes.Withdrawal}>Saque (Despesa)</option>
              <option value={transactionTypes.Transfer}>Transferência (Despesa)</option>
            </select>
            {showError("type") ? <p className={errorText}>{errors.type}</p> : null}
          </div>

          <div>
            <label className={labelClass}>Descrição</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => markTouched("name")}
              list={datalistId}
              placeholder={isIncome ? "ex: Salário" : "ex: Alimentação"}
              className={cn(baseInput, showError("name") ? inputWithError : inputNormal)}
              required
            />

            <datalist id={datalistId}>
              {descriptionSuggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>

            {showError("name") ? <p className={errorText}>{errors.name}</p> : null}

            <p className="mt-1 text-[11px] text-neutral-600-on-light">
              Sugestões mudam conforme o tipo (receita vs despesa). {/* datalist/list [web:184] */}
            </p>
          </div>

          <div>
            <label className={labelClass}>Valor</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500-on-light">
                R$
              </span>
              <input
                type="text"
                inputMode="decimal"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                onBlur={() => markTouched("amount")}
                placeholder="0,00"
                className={cn(baseInput, "pl-9", showError("amount") ? inputWithError : inputNormal)}
                required
              />
            </div>
            {showError("amount") ? <p className={errorText}>{errors.amount}</p> : null}
          </div>

          <div>
            <label className={labelClass}>Data</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={() => markTouched("date")}
              className={cn(baseInput, showError("date") ? inputWithError : inputNormal)}
              required
            />
            {showError("date") ? <p className={errorText}>{errors.date}</p> : null}
          </div>

          <div>
            <label className={labelClass}>Detalhes Adicionais (opcional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={() => markTouched("description")}
              placeholder="Adicione quaisquer notas adicionais..."
              rows={3}
              className={cn(baseInput, "resize-none", inputNormal)}
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
