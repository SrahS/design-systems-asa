import { useCallback } from "react";
import { updateTransactionUseCase } from "@/application/usecases/defaultUseCases";
import { toLegacyTransaction } from "@/application/adapters/legacyMappers";
import type { CreateTransactionPayload } from "../types/TransactionPayload";

export const useUpdateTransaction = () => {
  const updateTransaction = useCallback(
    async (transactionId: number, payload: CreateTransactionPayload) => {
      const { id_users } = payload;
      if (id_users == null) {
        throw new Error("Usuário ativo não encontrado para atualizar transação");
      }

      const categoryId = payload.selectedCategory;
      const transaction = await updateTransactionUseCase.execute({
        transactionId,
        userId: id_users,
        categoryId,
        amount: payload.amount,
        description: payload.description,
        occurredAt: payload.occured_at,
        notes: payload.notes,
        attachmentsCount: payload.attachmentsCount
      });
      return toLegacyTransaction(transaction);
    },
    []
  );

  return { updateTransaction };
};
