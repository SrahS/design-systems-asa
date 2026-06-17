import type {
  Transaction,
  UpdateTransactionInput,
} from "@/domain/entities/Transaction";
import type { CategoryRepository } from "@/domain/ports/CategoryRepository";
import type { TransactionRepository } from "@/domain/ports/TransactionRepository";

export class UpdateTransaction {
  constructor(
    private readonly transactions: TransactionRepository,
    private readonly categories: CategoryRepository
  ) {}

  execute = async (input: UpdateTransactionInput): Promise<Transaction> => {
    const category = await this.categories.getById(input.categoryId);
    if (!category) {
      throw new Error("Categoria inválida para atualização da transação");
    }

    return this.transactions.update({
      ...input,
      description: input.description.trim(),
      notes: input.notes.trim(),
    });
  };
}
