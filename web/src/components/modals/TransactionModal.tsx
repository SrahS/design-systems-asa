"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Transaction, transactionType, transactionTypes } from "@/types";
import { useTransactions } from "@/store/hooks";
import { cn } from "@/lib/utils";

import { saveAttachment, deleteAttachment } from "@/lib/attachmentsStore";
import type { TransactionAttachment } from "@/types";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

type FormErrors = Partial<Record<"type" | "name" | "amount" | "date", string>>;

const incomeSuggestions = ["Salário", "Freelance", "Reembolso", "Dividendos", "Rendimento", "Cashback", "Outros"];
const expenseSuggestions = ["Alimentação", "Supermercado", "Transporte", "Moradia", "Saúde", "Lazer", "Educação", "Assinaturas", "Outros"];

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { 
    addTransaction, 
    updateTransaction,
    loading,
    error: reduxError 
  } = useTransactions();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [attachmentMeta, setAttachmentMeta] = useState<TransactionAttachment[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const datalistId = isIncome ? "income-desc-suggestions" : "expense-desc-suggestions";

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls({});

    setSelectedFiles([]);
    setAttachmentMeta(transaction?.attachments ?? []);
    setLocalError(null);
    setIsSubmitting(false);

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

  const fileKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.currentTarget.files;
    if (!list) return;

    const files = Array.from(list);
    setSelectedFiles(files);

    const next: Record<string, string> = {};
    for (const f of files) {
      if (f.type.startsWith("image/")) {
        next[fileKey(f)] = URL.createObjectURL(f);
      }
    }

    Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls(next);
  };

  const removeExistingAttachment = async (id: string) => {
    try {
      await deleteAttachment(id);
      setAttachmentMeta((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setLocalError("Erro ao remover anexo. Tente novamente.");
      console.error("Erro ao remover anexo:", err);
    }
  };

  const removeSelectedFile = (key: string) => {
    setSelectedFiles((prev) => prev.filter((f) => fileKey(f) !== key));
    setPreviewUrls((prev) => {
      const url = prev[key];
      if (url) URL.revokeObjectURL(url);
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
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

  const showError = (key: keyof FormErrors) => Boolean(touched[key] && errors[key]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setTouched({ type: true, name: true, amount: true, date: true, description: true });

    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    setLocalError(null);

    try {
      const newAttachments: TransactionAttachment[] = [];

      for (const file of selectedFiles) {
        try {
          const id = crypto.randomUUID();
          await saveAttachment(id, file);
          newAttachments.push({ id, name: file.name, type: file.type, size: file.size });
        } catch (err) {
          console.error("Erro ao salvar anexo:", err);
          setLocalError("Erro ao salvar um ou mais anexos. Tente novamente.");
          setIsSubmitting(false);
          return;
        }
      }

      const mergedAttachments = [...(attachmentMeta ?? []), ...newAttachments];

      const amountNum = Number(formData.amount.trim().replace(",", "."));
      const amount = formData.type === transactionTypes.Deposit ? amountNum : -amountNum;

      if (transaction) {
        await updateTransaction(transaction.id, {
          name: formData.name,
          amount,
          type: formData.type,
          description: formData.description,
          date: formData.date,
          attachments: mergedAttachments,
        });
      } else {
        await addTransaction({
          name: formData.name,
          amount,
          type: formData.type,
          description: formData.description,
          date: formData.date,
          reference: "Ref",
          attachments: mergedAttachments,
        });
      }

      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar transação";
      setLocalError(errorMessage);
      console.error("Erro ao submeter formulário:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  const isEditing = !!transaction;

  const fieldCardClass =
    "rounded-md border border-pill-stroke bg-surface-2 p-4";

  const labelClass =
    "block text-xs font-medium text-text-muted mb-2";

  const baseInput =
    "w-full rounded-md border bg-background text-text text-sm font-medium px-4 py-2.5 outline-none transition-colors placeholder:text-text-subtle focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed";

  const inputNormal = "border-stroke";
  const inputWithError =
    "border-danger focus:ring-danger/30 focus:border-danger";

  const errorText = "mt-2 text-xs font-medium text-danger";

  const displayError = reduxError || localError;

  return (
    <div
      className="
        fixed inset-0 z-50 p-4
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? "Editar transação" : "Nova transação"}
      onClick={handleBackdropClick}
    >
      <div
        className="
          flex flex-col
          w-full max-w-md max-h-[90vh]
          rounded-xl bg-surface
          border border-stroke
          shadow-lift
          overflow-hidden
        "
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-stroke shrink-0">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-text tracking-tight">
              {isEditing ? "Editar Transação" : "Nova Transação"}
            </h2>
            <p className="mt-1 text-xs font-medium text-text-muted">
              Preencha os campos abaixo para {isEditing ? "atualizar" : "criar"}.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              inline-flex items-center justify-center shrink-0
              h-9 w-9 rounded-pill
              bg-pill border border-stroke text-off-white
              hover:bg-surface-3
              active:opacity-pressed-soft
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              focus-visible:ring-offset-2 focus-visible:ring-offset-background
              transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Fechar"
            type="button"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-3"
        >
          {displayError && (
            <div className="p-3 rounded-md bg-danger/15 border border-danger/30">
              <p className="text-sm font-medium text-danger">
                {displayError}
              </p>
            </div>
          )}

          <div className={fieldCardClass}>
            <label className={labelClass}>Tipo de Transação</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              onBlur={() => markTouched("type")}
              className={cn(baseInput, showError("type") ? inputWithError : inputNormal)}
              disabled={isSubmitting}
            >
              <option value={transactionTypes.Deposit}>Depósito (Receita)</option>
              <option value={transactionTypes.Withdrawal}>Saque (Despesa)</option>
              <option value={transactionTypes.Transfer}>Transferência (Despesa)</option>
            </select>
            {showError("type") ? <p className={errorText}>{errors.type}</p> : null}
          </div>

          <div className={fieldCardClass}>
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
              disabled={isSubmitting}
              required
            />

            <datalist id={datalistId}>
              {descriptionSuggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>

            {showError("name") ? <p className={errorText}>{errors.name}</p> : null}

            <p className="mt-2 text-[11px] font-medium text-text-subtle">
              Sugestões mudam conforme o tipo (receita vs despesa).
            </p>
          </div>

          <div className={fieldCardClass}>
            <label className={labelClass}>Valor</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted">
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
                className={cn(
                  baseInput,
                  "pl-10",
                  showError("amount") ? inputWithError : inputNormal
                )}
                disabled={isSubmitting}
                required
              />
            </div>
            {showError("amount") ? <p className={errorText}>{errors.amount}</p> : null}
          </div>

          <div className={fieldCardClass}>
            <label className={labelClass}>Data</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={() => markTouched("date")}
              className={cn(
                baseInput,
                "[color-scheme:dark]",
                showError("date") ? inputWithError : inputNormal
              )}
              disabled={isSubmitting}
              required
            />
            {showError("date") ? <p className={errorText}>{errors.date}</p> : null}
          </div>

          <div className={fieldCardClass}>
            <label className={labelClass}>Detalhes Adicionais (opcional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={() => markTouched("description")}
              placeholder="Adicione quaisquer notas adicionais..."
              rows={3}
              className={cn(baseInput, "resize-none", inputNormal)}
              disabled={isSubmitting}
            />
          </div>

          <div className={fieldCardClass}>
            <label className={labelClass}>Anexos (opcional)</label>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFilesChange}
              className="
                w-full rounded-md border border-stroke bg-background text-text
                text-sm font-medium px-3 py-2.5 cursor-pointer transition-colors
                file:mr-3 file:rounded-xs file:border-0
                file:bg-pill file:text-text file:px-3 file:py-1.5
                file:text-xs file:font-semibold file:cursor-pointer
                hover:file:bg-surface-3
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled={isSubmitting}
            />

            {(attachmentMeta.length > 0 || selectedFiles.length > 0) ? (
              <div className="mt-3 space-y-2">
                {attachmentMeta.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-stroke bg-pill p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text truncate">{a.name}</p>
                      <p className="text-[11px] font-medium text-text-subtle">
                        {Math.round(a.size / 1024)} KB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeExistingAttachment(a.id)}
                      className="
                        text-xs font-semibold text-text-muted
                        hover:text-danger transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                      disabled={isSubmitting}
                    >
                      Remover
                    </button>
                  </div>
                ))}

                {selectedFiles.map((f) => {
                  const key = fileKey(f);
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-3 rounded-md border border-stroke bg-pill p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">{f.name}</p>
                        <p className="text-[11px] font-medium text-text-subtle">
                          {Math.round(f.size / 1024)} KB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeSelectedFile(key)}
                        className="
                          text-xs font-semibold text-text-muted
                          hover:text-danger transition-colors
                          disabled:opacity-50 disabled:cursor-not-allowed
                        "
                        disabled={isSubmitting}
                      >
                        Remover
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 inline-flex items-center justify-center
                h-12 px-4 rounded-lg text-md font-semibold
                bg-surface-2 border border-pill-stroke text-text
                hover:bg-surface-3
                active:opacity-pressed-soft
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-background
                transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled={isSubmitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                flex-1 inline-flex items-center justify-center
                h-12 px-4 rounded-lg text-md font-semibold
                bg-primary text-text shadow-soft
                hover:bg-primary-hover
                active:opacity-pressed-strong
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-background
                transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                  Salvando...
                </span>
              ) : isEditing ? (
                "Atualizar"
              ) : (
                "Criar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
