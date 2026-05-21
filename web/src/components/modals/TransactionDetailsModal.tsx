"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Transaction, transactionType, transactionTypes } from "@/types";
import { cn } from "@/lib/utils";

import { getAttachment } from "@/lib/attachmentsStore";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

type AttachmentPreview = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
};

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  const [attachmentPreviews, setAttachmentPreviews] = useState<AttachmentPreview[]>([]);
  const [attachmentsLoading, setAttachmentsLoading] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (!isOpen || !transaction) return;

    let cancelled = false;
    setAttachmentsLoading(true);

    (async () => {
      const next: AttachmentPreview[] = [];

      for (const a of transaction.attachments ?? []) {
        const file = await getAttachment(a.id);
        if (!file) continue;

        const url = URL.createObjectURL(file);
        next.push({
          id: a.id,
          name: a.name,
          type: a.type,
          size: a.size,
          url,
        });
      }

      if (!cancelled) {
        setAttachmentPreviews(next);
        setAttachmentsLoading(false);
      } else {
        next.forEach((p) => URL.revokeObjectURL(p.url));
      }
    })();

    return () => {
      cancelled = true;
      setAttachmentsLoading(false);

      setAttachmentPreviews((prev) => {
        prev.forEach((p) => URL.revokeObjectURL(p.url));
        return [];
      });
    };
  }, [isOpen, transaction?.id]);

  if (!isOpen || !transaction) return null;

  const formattedDate = new Date(transaction.date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getTypeClasses = (type: transactionType) => {
    switch (type) {
      case transactionTypes.Deposit:
        return "bg-success/15 text-success border border-success/30";
      case transactionTypes.Withdrawal:
      case transactionTypes.Transfer:
        return "bg-danger/15 text-danger border border-danger/30";
      default:
        return "bg-pill text-text border border-pill-stroke";
    }
  };

  const amountColorClass =
    transaction.amount >= 0 ? "text-success" : "text-danger";

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        p-4
      "
      role="dialog"
      aria-modal="true"
      aria-label="Detalhes da transação"
      onClick={handleBackdropClick}
    >
      <div
        className="
          w-full max-w-lg
          rounded-xl bg-surface
          border border-stroke
          shadow-lift
        "
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-stroke">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-text tracking-tight">
              Detalhes da Transação
            </h2>
            <p className="mt-1 text-xs font-medium text-text-muted">
              Confira as informações completas desta movimentação.
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
            "
            aria-label="Fechar"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-text-muted">Tipo</p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-pill px-3 py-1 text-xs font-semibold leading-none",
                getTypeClasses(transaction.type)
              )}
            >
              {transaction.type}
            </span>
          </div>

          <div className="rounded-md border border-pill-stroke bg-surface-2 p-5 shadow-soft text-center">
            <p className="text-xs font-medium text-text-muted">Valor</p>
            <p
              className={cn(
                "mt-1 text-xxl font-bold tracking-tight",
                amountColorClass
              )}
            >
              {transaction.amount >= 0 ? "+" : "-"}R$
              {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-md border border-pill-stroke bg-surface-2 p-4">
              <p className="text-xs font-medium text-text-muted">Descrição</p>
              <p className="mt-2 text-md font-semibold text-text">
                {transaction.name}
              </p>
            </div>

            <div className="rounded-md border border-pill-stroke bg-surface-2 p-4">
              <p className="text-xs font-medium text-text-muted">Data</p>
              <p className="mt-2 text-md font-semibold text-text">
                {formattedDate}
              </p>
            </div>

            <div className="rounded-md border border-pill-stroke bg-surface-2 p-4">
              <p className="text-xs font-medium text-text-muted">Referência</p>
              <p className="mt-2 text-sm font-mono text-text break-all">
                {transaction.reference}
              </p>
            </div>

            {transaction.description ? (
              <div className="rounded-md border border-pill-stroke bg-surface-2 p-4">
                <p className="text-xs font-medium text-text-muted">
                  Detalhes adicionais
                </p>
                <p className="mt-2 text-md font-semibold text-text">
                  {transaction.description}
                </p>
              </div>
            ) : null}

            <div className="rounded-md border border-pill-stroke bg-surface-2 p-4">
              <p className="text-xs font-medium text-text-muted">Anexos</p>

              {attachmentsLoading ? (
                <p className="mt-3 text-sm font-medium text-text-muted">
                  Carregando anexos...
                </p>
              ) : transaction.attachments?.length ? (
                <div className="mt-3 space-y-2">
                  {attachmentPreviews.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between gap-3 rounded-md border border-stroke bg-pill p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">
                          {a.name}
                        </p>
                        <p className="text-[11px] font-medium text-text-subtle">
                          {Math.round(a.size / 1024)} KB
                        </p>
                      </div>

                      {a.type.startsWith("image/") ? (
                        <a href={a.url} target="_blank" rel="noreferrer">
                          <img
                            src={a.url}
                            alt={a.name}
                            className="h-12 w-12 rounded-md object-cover border border-stroke"
                          />
                        </a>
                      ) : (
                        <a
                          href={a.url}
                          download={a.name}
                          className="text-sm font-semibold text-primary hover:text-primary-hover hover:underline underline-offset-4 transition-colors"
                        >
                          Baixar
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm font-medium text-text-muted">
                  Nenhum anexo.
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="
                w-full inline-flex items-center justify-center
                h-12 px-6 rounded-lg
                bg-primary text-text text-md font-semibold
                shadow-soft
                hover:bg-primary-hover
                active:opacity-pressed-strong
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-background
                transition-colors
              "
              type="button"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
