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
        return "bg-semantic-success-100-on-light text-semantic-success-900-on-light";
      case transactionTypes.Withdrawal:
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
      onClick={handleBackdropClick}
    >
      <div
        className="
          w-full max-w-lg
          rounded-2xl bg-white
          border border-neutral-200/70
          shadow-[0_18px_55px_rgba(15,23,42,0.18)]
        "
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
            type="button"
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

            <div className="space-y-2">
              <p className="text-xs text-neutral-600-on-light">Anexos</p>

              {attachmentsLoading ? (
                <p className="text-sm text-neutral-700-on-light">Carregando anexos...</p>
              ) : (transaction.attachments?.length ? (
                <div className="space-y-2">
                  {attachmentPreviews.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200/70 bg-neutral-50/60 p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-1000-on-light truncate">
                          {a.name}
                        </p>
                        <p className="text-[11px] text-neutral-600-on-light">
                          {Math.round(a.size / 1024)} KB
                        </p>
                      </div>

                      {a.type.startsWith("image/") ? (
                        <a href={a.url} target="_blank" rel="noreferrer">
                          <img
                            src={a.url}
                            alt={a.name}
                            className="h-12 w-12 rounded-lg object-cover border border-neutral-200/70"
                          />
                        </a>
                      ) : (
                        <a
                          href={a.url}
                          download={a.name}
                          className="text-sm text-primary-900-on-light hover:underline"
                        >
                          Baixar
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-700-on-light">Nenhum anexo.</p>
              ))}
            </div>
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
