import { useCallback } from "react";
import { excludeTransactionUseCase } from "@/application/usecases/defaultUseCases";

export const useExcludeTransaction = () => {

  const excludeTransaction = useCallback(
    async (transactionId: number, userId: number): Promise<void> => {
      if (userId == null) {
        throw new Error("Usuário ativo não encontrado para excluir transação");
      }

      await excludeTransactionUseCase.execute({
        transactionId,
        userId,
      });
    },
    []
  );

  return { excludeTransaction };
};
