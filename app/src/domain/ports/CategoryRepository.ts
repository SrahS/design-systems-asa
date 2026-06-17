import type { Category, CategoryId } from "../entities/Category";
import type { Unsubscribe } from "./Unsubscribe";

export interface CategoryRepository {
  list(): Promise<Category[]>;
  getById(categoryId: CategoryId): Promise<Category | null>;
  observe?(
    onChange: (categories: Category[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe;
}
