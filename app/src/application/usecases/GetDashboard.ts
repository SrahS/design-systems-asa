import type { Category } from "@/domain/entities/Category";
import type { Transaction } from "@/domain/entities/Transaction";
import type { UserId } from "@/domain/entities/User";
import type { CategoryRepository } from "@/domain/ports/CategoryRepository";
import type { TransactionRepository } from "@/domain/ports/TransactionRepository";

export type DashboardData = {
  transactions: Transaction[];
  categories: Category[];
  categoriesById: Map<Category["id"], Category>;
};

export class GetDashboard {
  constructor(
    private readonly transactions: TransactionRepository,
    private readonly categories: CategoryRepository
  ) {}

  execute = async (userId: UserId | null): Promise<DashboardData> => {
    const [transactions, categories] = await Promise.all([
      userId == null ? Promise.resolve([]) : this.transactions.list(userId),
      this.categories.list(),
    ]);

    return {
      transactions,
      categories,
      categoriesById: new Map(
        categories.map((category) => [category.id, category])
      ),
    };
  };
}
