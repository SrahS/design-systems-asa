import { useCallback } from "react";
import { createTransactionUseCase } from "@/application/usecases/defaultUseCases";
import { toLegacyTransaction } from "@/application/adapters/legacyMappers";
import type { CreateTransactionPayload } from "../types/TransactionPayload";

export const useCreateTransaction = () => {

  const createTransaction = useCallback(
    async (payload: CreateTransactionPayload) => {
      const { id_users } = payload;
      if (id_users == null) {
        throw new Error("Usuário ativo não encontrado para cadastrar transação");
      }

      const transaction = await createTransactionUseCase.execute({
        userId: id_users,
        categoryId: payload.selectedCategory,
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

  return { createTransaction };
};
