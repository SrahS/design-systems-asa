import type {
  TransactionAttachment,
  TransactionDetail,
  TransactionType,
} from "@/features/transactions/types/TransactionDetail";
import {
  transactionCategoryLabels,
  type TransactionCategory,
} from "@/features/transactions/types/TransactionCategory";
import type { TransactionListItem } from "@/features/transactions/types/TransactionListItem";
import { parseDateTime } from "@/utils/formatDate";
import type { AttachmentTransaction } from "@/types/attachmentTransaction";
import type { Category } from "@/types/category";
import type { RecentTransaction } from "@/types/RecentTransaction";
import type { Transaction } from "@/types/transaction";
import type { TransactionWithRelations } from "@/types/transactionWithRelations";

const SHORT_DAY_LABEL_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

const DETAIL_DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const mapCategoryIcon = (
  icon: Category["icon"]
): RecentTransaction["icon"] => {
  if (icon === "trending-up-outline") return "trending-up-outline";
  if (icon === "trending-down-outline") return "trending-down-outline";
  if (icon === "swap-horizontal") return "swap-horizontal";
  return "wallet-outline";
};

export const getTransactionCategory = (
  category: Category | null
): TransactionCategory => {
  if (!category) return "withdraw";
  if (category.icon === "trending-up-outline") return "deposit";
  if (category.icon === "swap-horizontal") return "transfer";
  if (category.name === "Transferência") return "transfer";
  return "withdraw";
};

const getTransactionType = (category: Category | null): TransactionType => {
  if (!category) return "Saque";
  if (category.name === "Depósito") return "Depósito";
  if (category.name === "Transferência") return "Transferência";
  return "Saque";
};

const formatDateLabel = (date: Date, referenceDate: Date) => {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const normalizedReference = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );
  const diffDays = Math.round(
    (normalizedReference.getTime() - normalizedDate.getTime()) / oneDayMs
  );

  if (diffDays <= 0) {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }
  if (diffDays === 1) return "Ontem";

  return SHORT_DAY_LABEL_FORMATTER.format(date).replace(".", "");
};

const formatDetailDate = (date: Date) =>
  DETAIL_DATE_FORMATTER.format(date).replace(".", "");

export const inferAttachmentType = (
  fileName: string
): TransactionAttachment["type"] => {
  const normalized = fileName.toLowerCase();
  if (normalized.endsWith(".pdf")) return "pdf";
  return "image";
};

export const toAmountCents = (amount: number) => Math.round(amount * 100);

export const getReferenceDate = (transactions: Transaction[]) => {
  const newest = transactions[0];
  return newest ? parseDateTime(newest.occured_at) : new Date();
};

export const toRecentTransaction = (
  transaction: Transaction,
  category: Category | null,
  referenceDate: Date
): RecentTransaction => {
  const occurredAt = parseDateTime(transaction.occured_at);
  return {
    id: transaction.id_transactions,
    merchant: transaction.description,
    dateLabel: formatDateLabel(occurredAt, referenceDate),
    amountCents: toAmountCents(transaction.amount),
    icon: mapCategoryIcon(category?.icon ?? ""),
  };
};

export const toTransactionListItem = (
  transaction: Transaction,
  category: Category | null,
  referenceDate: Date
): TransactionListItem => {
  const mappedCategory = getTransactionCategory(category);
  const occurredAt = parseDateTime(transaction.occured_at);

  return {
    ...transaction,
    dateLabel: formatDateLabel(occurredAt, referenceDate),
    icon: mapCategoryIcon(category?.icon ?? ""),
    category: mappedCategory,
    context: transaction.notes || transactionCategoryLabels[mappedCategory],
  };
};

export const toTransactionAttachment = (
  attachment: AttachmentTransaction
): TransactionAttachment => {
  return {
    id: String(attachment.id_attachments),
    name: attachment.file_name,
    type: inferAttachmentType(attachment.file_name),
  };
};

export const toTransactionDetail = (
  joined: TransactionWithRelations,
  referenceDate: Date
): TransactionDetail => {
  const occurredAt = parseDateTime(joined.transaction.occured_at);

  return {
    ...toRecentTransaction(joined.transaction, joined.category, referenceDate),
    amount: joined.transaction.amount,
    tipo: getTransactionType(joined.category),
    descricao: joined.transaction.description,
    data: formatDetailDate(occurredAt),
    detalhesAdicionais: joined.transaction.notes,
    anexos: joined.attachments.map(toTransactionAttachment),
  };
};
