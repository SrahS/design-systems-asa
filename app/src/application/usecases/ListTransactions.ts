import type { Transaction } from "@/domain/entities/Transaction";
import type { UserId } from "@/domain/entities/User";
import type { TransactionRepository } from "@/domain/ports/TransactionRepository";

export class ListTransactions {
  constructor(private readonly transactions: TransactionRepository) {}

  execute = async (userId: UserId | null): Promise<Transaction[]> => {
    if (userId == null) {
      return [];
    }

    return this.transactions.list(userId);
  };
}
