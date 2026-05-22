"use client";

import { useEffect, useMemo, useState } from "react";
import { X, AlertCircle, Paperclip, Trash2 } from "lucide-react";
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

  // Classes de Estilo Acessíveis
  const labelClass = "block text-base font-bold text-gray-700 mb-2";
  const baseInput = "w-full rounded-xl border-2 bg-white text-gray-900 text-lg px-4 py-4 outline-none transition-colors placeholder:text-gray-400 focus:ring-4 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:bg-gray-100";

  const inputNormal = "border-gray-300";
  const inputWithError = "border-red-500 focus:ring-red-200 focus:border-red-600 bg-red-50";
  const errorText = "mt-2 text-base font-bold text-red-600 flex items-center gap-1";

  const displayError = reduxError || localError;

  return (
    <div
      className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-form-title"
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col w-full max-w-xl max-h-[90vh] rounded-2xl bg-gray-50 shadow-2xl overflow-hidden">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white shrink-0">
          <div>
            <h2 id="modal-form-title" className="text-2xl font-bold text-gray-900">
              {isEditing ? "Editar Registro" : "Adicionar Nova Transação"}
            </h2>
            <p className="mt-1 text-base font-medium text-gray-500">
              Preencha os dados abaixo com atenção.
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors focus:ring-4 focus:ring-primary/30"
            aria-label="Cancelar e fechar"
            type="button"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Formulário Completo */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">

          {/* Área com Scroll para os campos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {displayError && (
              <div className="p-4 rounded-xl bg-red-100 border-l-4 border-red-600 flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-700 shrink-0" />
                <p className="text-base font-bold text-red-800">
                  {displayError}
                </p>
              </div>
            )}

            <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">

              <div>
                <label className={labelClass} htmlFor="transaction-type">O que é este lançamento?</label>
                <select
                  id="transaction-type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  onBlur={() => markTouched("type")}
                  className={cn(baseInput, showError("type") ? inputWithError : inputNormal)}
                  disabled={isSubmitting}
                >
                  <option value={transactionTypes.Deposit}>➕ É um dinheiro que ENTROU (Receita)</option>
                  <option value={transactionTypes.Withdrawal}>➖ É um GASTO que eu fiz (Despesa)</option>
                  <option value={transactionTypes.Transfer}>💸 Transferi para outra conta</option>
                </select>
                {showError("type") && <p className={errorText}><AlertCircle className="w-5 h-5" /> {errors.type}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="transaction-amount">Qual o valor?</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-500">
                    R$
                  </span>
                  <input
                    id="transaction-amount"
                    type="text"
                    inputMode="decimal"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    onBlur={() => markTouched("amount")}
                    placeholder="0,00"
                    className={cn(baseInput, "pl-14 text-xl font-bold", showError("amount") ? inputWithError : inputNormal)}
                    disabled={isSubmitting}
                    required
                    aria-invalid={showError("amount")}
                  />
                </div>
                {showError("amount") && <p className={errorText}><AlertCircle className="w-5 h-5" /> {errors.amount}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="transaction-name">Dê um nome para identificar</label>
                <input
                  id="transaction-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => markTouched("name")}
                  list={datalistId}
                  placeholder={isIncome ? "ex: Pagamento de Aposentadoria" : "ex: Compra na Padaria"}
                  className={cn(baseInput, showError("name") ? inputWithError : inputNormal)}
                  disabled={isSubmitting}
                  required
                />
                <datalist id={datalistId}>
                  {descriptionSuggestions.map((s) => <option key={s} value={s} />)}
                </datalist>
                {showError("name") && <p className={errorText}><AlertCircle className="w-5 h-5" /> {errors.name}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="transaction-date">Data</label>
                <input
                  id="transaction-date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={() => markTouched("date")}
                  className={cn(baseInput, showError("date") ? inputWithError : inputNormal)}
                  disabled={isSubmitting}
                  required
                />
                {showError("date") && <p className={errorText}><AlertCircle className="w-5 h-5" /> {errors.date}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="transaction-description">Detalhes Adicionais (opcional)</label>
                <textarea
                  id="transaction-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={() => markTouched("description")}
                  placeholder="Escreva alguma anotação para lembrar depois..."
                  rows={3}
                  className={cn(baseInput, "resize-none", inputNormal)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Seção de Anexos */}
              <div className="pt-2 border-t border-gray-100">
                <label className={labelClass} htmlFor="transaction-files">Anexar Comprovantes ou Recibos (opcional)</label>

                <div className="mt-2 relative">
                  <input
                    id="transaction-files"
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFilesChange}
                    className="
                      absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed
                    "
                    disabled={isSubmitting}
                    aria-label="Clique para anexar comprovantes"
                  />
                  <div className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center hover:bg-gray-100 transition-colors pointer-events-none">
                    <Paperclip className="w-10 h-10 text-primary mb-2" />
                    <span className="text-lg font-bold text-primary">Toque aqui para escolher arquivos</span>
                    <span className="text-base text-gray-500 mt-1">Imagens ou PDFs</span>
                  </div>
                </div>

                {/* Lista de Anexos (Novos e Existentes) */}
                {(attachmentMeta.length > 0 || selectedFiles.length > 0) && (
                  <div className="mt-4 space-y-3">

                    {/* Anexos já salvos */}
                    {attachmentMeta.map((a) => (
                      <div key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4">
                        <div className="min-w-0">
                          <p className="text-base font-bold text-gray-900 truncate">{a.name}</p>
                          <p className="text-sm font-medium text-gray-500">
                            {Math.round(a.size / 1024)} KB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingAttachment(a.id)}
                          className="inline-flex items-center gap-2 px-3 min-h-[48px] text-base font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                          aria-label={`Remover anexo ${a.name}`}
                        >
                          <Trash2 className="w-5 h-5" />
                          <span className="hidden sm:inline">Remover</span>
                        </button>
                      </div>
                    ))}

                    {/* Novos anexos selecionados */}
                    {selectedFiles.map((f) => {
                      const key = fileKey(f);
                      return (
                        <div key={key} className="flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                          <div className="min-w-0">
                            <p className="text-base font-bold text-blue-900 truncate">{f.name}</p>
                            <p className="text-sm font-medium text-blue-700">
                              Novo arquivo • {Math.round(f.size / 1024)} KB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(key)}
                            className="inline-flex items-center gap-2 px-3 min-h-[48px] text-base font-bold text-red-600 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                            aria-label={`Remover novo arquivo ${f.name}`}
                          >
                            <Trash2 className="w-5 h-5" />
                            <span className="hidden sm:inline">Remover</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ações Fixas no Rodapé */}
          <div className="px-6 py-5 bg-white border-t border-gray-200 flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[56px] text-lg font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors focus:ring-4 focus:ring-gray-300"
              disabled={isSubmitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 min-h-[56px] text-lg font-bold text-white bg-primary hover:bg-primary-hover shadow-lg rounded-xl transition-colors focus:ring-4 focus:ring-primary/40 disabled:opacity-70 disabled:cursor-wait"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Salvando informações..." : (isEditing ? "Atualizar Transação" : "Confirmar e Salvar")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}