import type { ExcludeTransactionInput } from "@/domain/entities/Transaction";
import type { TransactionRepository } from "@/domain/ports/TransactionRepository";

export class ExcludeTransaction {
  constructor(private readonly transactions: TransactionRepository) {}

  execute = async (input: ExcludeTransactionInput): Promise<void> => {
    await this.transactions.exclude(input);
  };
}
