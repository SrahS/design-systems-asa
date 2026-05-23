import type {
  CreateTransactionInput,
  Transaction,
} from "@/domain/entities/Transaction";
import type { TransactionRepository } from "@/domain/ports/TransactionRepository";

export class CreateTransaction {
  constructor(private readonly transactions: TransactionRepository) {}

  execute = async (input: CreateTransactionInput): Promise<Transaction> => {
    return this.transactions.create({
      ...input,
      description: input.description.trim(),
      notes: input.notes.trim(),
    });
  };
}
