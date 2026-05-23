import type { CategoryId } from "./Category";
import type { UserId } from "./User";

export type TransactionId = number;

export type Transaction = {
  id: TransactionId;
  userId: UserId;
  categoryId: CategoryId;
  amount: number;
  description: string;
  occurredAt: string;
  notes: string;
  excluded: boolean;
  attachmentCount: number;
  createdAt: string;
  updatedAt: string | null;
};

export type CreateTransactionInput = {
  userId: UserId;
  categoryId: CategoryId;
  amount: number;
  description: string;
  occurredAt: string;
  notes: string;
  attachmentsCount: number;
};

export type UpdateTransactionInput = {
  transactionId: TransactionId;
  userId: UserId;
  categoryId: CategoryId;
  amount: number;
  description: string;
  occurredAt: string;
  notes: string;
  attachmentsCount: number;
};

export type ExcludeTransactionInput = {
  transactionId: TransactionId;
  userId: UserId;
};
