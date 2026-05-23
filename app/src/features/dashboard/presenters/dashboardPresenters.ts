import type { BudgetCategory } from "@/features/dashboard/types/BudgetCategory";
import type { BudgetSummary } from "@/features/dashboard/types/BudgetSummary";
import type { IncomeItem } from "@/types/IncomeItem";
import type { Category } from "@/types/category";
import type { Transaction } from "@/types/transaction";
import { parseDateTime } from "@/utils/formatDate";
import {
  getReferenceDate,
  getTransactionCategory,
  toAmountCents,
} from "@/features/transactions/presenters/transactionPresenters";

const MONTH_LABEL_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

const capitalizeFirst = (value: string) =>
  value.length > 0 ? value[0].toUpperCase() + value.slice(1) : value;

const mapCategoryNameToPlural = (name: string) => {
  if (name === "Depósito") return "Depósitos";
  if (name === "Saque") return "Saques";
  if (name === "Transferência") return "Transferências";
  return name;
};

const mapCategoryTone = (color: Category["color"]): BudgetCategory["tone"] => {
  if (color === "purple") return "purple";
  if (color === "cyan") return "cyan";
  return "light";
};

export const toBudgetSummary = (
  transactions: Transaction[],
  categoriesById: Map<number, Category>
): BudgetSummary => {
  const totals = transactions.reduce(
    (acc, transaction) => {
      const amountCents = toAmountCents(transaction.amount);
      const category = categoriesById.get(transaction.id_categories) ?? null;
      const categoryType = getTransactionCategory(category);

      if (categoryType === "deposit") {
        acc.depositsCents += amountCents;
        acc.totalBalance += amountCents;
      } else {
        acc.totalBalance -= amountCents;
      }

      return acc;
    },
    { depositsCents: 0, totalBalance: 0 }
  );

  return {
    totalBalance: totals.totalBalance,
    leftToBudgetCents: totals.depositsCents,
    currency: "BRL",
  };
};

export const toBudgetCategories = (
  transactions: Transaction[],
  categories: Category[]
): BudgetCategory[] => {
  const totalsByCategory = new Map<number, number>();
  transactions.forEach((transaction) => {
    const current = totalsByCategory.get(transaction.id_categories) ?? 0;
    totalsByCategory.set(
      transaction.id_categories,
      current + toAmountCents(transaction.amount)
    );
  });

  const total = Array.from(totalsByCategory.values()).reduce(
    (sum, amount) => sum + amount,
    0
  );

  return categories.map((category) => {
    const amountCents = totalsByCategory.get(category.id_categories) ?? 0;
    const percent = total > 0 ? Math.round((amountCents / total) * 100) : 0;

    return {
      id: category.id_categories,
      name: mapCategoryNameToPlural(category.name),
      amountCents,
      percent,
      tone: mapCategoryTone(category.color),
    };
  });
};

export type TransactionCategorySeries = {
  id: "deposits" | "withdrawals" | "transfers";
  label: string;
  color: string;
  points: number[];
};

const CHART_BUCKETS = 9;

export const toDashboardChart = (
  transactions: Transaction[],
  categoriesById: Map<number, Category>
) => {
  const buckets = {
    deposits: Array.from({ length: CHART_BUCKETS }, () => 0),
    withdrawals: Array.from({ length: CHART_BUCKETS }, () => 0),
    transfers: Array.from({ length: CHART_BUCKETS }, () => 0),
  };

  transactions.forEach((transaction) => {
    const date = parseDateTime(transaction.occured_at);
    const monthDay = Math.min(Math.max(date.getDate(), 1), 31);
    const bucketIndex = Math.min(
      CHART_BUCKETS - 1,
      Math.floor(((monthDay - 1) / 31) * CHART_BUCKETS)
    );
    const category = categoriesById.get(transaction.id_categories) ?? null;
    const categoryType = getTransactionCategory(category);
    const amountCents = toAmountCents(transaction.amount);

    if (categoryType === "deposit") buckets.deposits[bucketIndex] += amountCents;
    else if (categoryType === "transfer") {
      buckets.transfers[bucketIndex] += amountCents;
    } else {
      buckets.withdrawals[bucketIndex] += amountCents;
    }
  });

  const maxPoint = Math.max(
    ...buckets.deposits,
    ...buckets.withdrawals,
    ...buckets.transfers,
    0
  );
  const step = Math.max(1, Math.ceil(maxPoint / 4 / 10000)) * 10000;
  const yTicks = [0, step, step * 2, step * 3, step * 4];

  const series: TransactionCategorySeries[] = [
    {
      id: "deposits",
      label: "Depósitos",
      color: "#7C4DFF",
      points: buckets.deposits,
    },
    {
      id: "withdrawals",
      label: "Saques",
      color: "#8FE7FF",
      points: buckets.withdrawals,
    },
    {
      id: "transfers",
      label: "Transferências",
      color: "rgba(241,243,247,0.6)",
      points: buckets.transfers,
    },
  ];

  return {
    title: "Movimentação por categoria",
    yTicks,
    series,
  };
};

export const toMonthLabel = (transactions: Transaction[]) => {
  const referenceDate = getReferenceDate(transactions);
  return capitalizeFirst(MONTH_LABEL_FORMATTER.format(referenceDate));
};

export const toIncomeItems = (
  transactions: Transaction[],
  categoriesById: Map<number, Category>
): IncomeItem[] => {
  const groups = new Map<string, number>();

  transactions.forEach((transaction) => {
    const category = categoriesById.get(transaction.id_categories);
    if (category?.name !== "Depósito") return;

    const current = groups.get(transaction.description) ?? 0;
    groups.set(transaction.description, current + toAmountCents(transaction.amount));
  });

  return Array.from(groups.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([name, amountCents], index) => ({
      id: index + 1,
      name,
      amountCents,
      icon: index === 0 ? "cash-outline" : "wallet-outline",
    }));
};
