import type {
  CreateTransactionInput,
  ExcludeTransactionInput,
  Transaction,
  TransactionId,
  UpdateTransactionInput,
} from "../entities/Transaction";
import type { UserId } from "../entities/User";
import type { Unsubscribe } from "./Unsubscribe";

export interface TransactionRepository {
  list(userId: UserId): Promise<Transaction[]>;
  getById(
    transactionId: TransactionId,
    userId: UserId
  ): Promise<Transaction | null>;
  create(input: CreateTransactionInput): Promise<Transaction>;
  update(input: UpdateTransactionInput): Promise<Transaction>;
  exclude(input: ExcludeTransactionInput): Promise<void>;
  applyAttachmentCount(
    transactionId: TransactionId,
    userId: UserId,
    count: number
  ): Promise<void>;
  observe?(
    userId: UserId,
    onChange: (transactions: Transaction[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe;
}
