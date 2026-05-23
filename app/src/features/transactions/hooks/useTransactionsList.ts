import { useMemo } from "react";
import {
  getReferenceDate,
  toTransactionListItem
} from "@/features/transactions/presenters/transactionPresenters";
import {
  toMonthLabel,
} from "@/features/dashboard/presenters/dashboardPresenters";
import { useCategories, useTransactions, useUser } from "@/hooks/domains";
import type { TransactionListItem } from "../types/TransactionListItem";

export const useTransactionsList = () => {
  const {
    data: { activeUserId },
    loading: activeUserLoading
  } = useUser();

  const {
    data: { transactions },
    loading: transactionsLoading
  } = useTransactions(activeUserId);
  const {
    data: { getById: getCategoryById }
  } = useCategories();

  return useMemo(() => {
    const referenceDate = getReferenceDate(transactions);
    const items: TransactionListItem[] = transactions.map((transaction) =>
      toTransactionListItem(
        transaction,
        getCategoryById(transaction.id_categories),
        referenceDate
      )
    );

    return {
      monthLabel: toMonthLabel(transactions),
      currency: "BRL" as const,
      items,
      userLoading: activeUserLoading || transactionsLoading
    };
  }, [activeUserLoading, getCategoryById, transactions, transactionsLoading]);
};

