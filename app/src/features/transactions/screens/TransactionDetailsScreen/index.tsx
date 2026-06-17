import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { attachmentsTransactionService } from "@/infrastructure/firebase";
import {
  toTransactionAttachment,
  toTransactionListItem
} from "@/features/transactions/presenters/transactionPresenters";
import { useTransactionRelations, useUser } from "@/hooks/domains";
import { ScreenContainer } from "@/components/ScreenContainer";
import { TransactionHeader } from "../../components/TransactionHeader";
import { TransactionSummaryCard } from "../../components/TransactionSummaryCard";
import { DetailInfoCard } from "../../components/DetailInfoCard";
import { AttachmentListSection } from "../../components/AttachmentListSection";
import { TransactionActionButtons } from "../../components/TransactionActionButtons";
import { useExcludeTransaction } from "../../hooks/useExcludeTransaction";
import { formatCurrentDatePtBr } from "@/utils/format";
import { parseDateTime } from "@/utils/formatDate";
import { parsePositiveIntRouteParam } from "@/utils/routeParams";
import styles from "./styles";

export const TransactionDetailsScreen = () => {
  const router = useRouter();
  const { excludeTransaction } = useExcludeTransaction();
  const [isRemovingAttachment, setIsRemovingAttachment] = useState(false);

  const params = useLocalSearchParams<{
    id?: string;
    id_users?: string;
  }>();
  const transactionId = parsePositiveIntRouteParam(params.id);
  const routeUserId = parsePositiveIntRouteParam(params.id_users);
  const {
    data: { activeUserId },
    loading: userLoading
  } = useUser();
  const userId = routeUserId ?? activeUserId;

  const {
    data: relationsData,
    loading: relationsLoading,
    error: relationsError
  } = useTransactionRelations(transactionId, userId);

  const transaction = useMemo(() => {
    if (relationsData == null) {
      return null;
    }

    return toTransactionListItem(
      relationsData.transaction,
      relationsData.category,
      parseDateTime(relationsData.transaction.occured_at)
    );
  }, [relationsData]);

  const attachments = useMemo(() => {
    return relationsData?.attachments.map(toTransactionAttachment) ?? [];
  }, [relationsData]);

  useEffect(() => {
    const hasInvalidParams =
      params.id == null ||
      transactionId == null ||
      (params.id_users != null && routeUserId == null);

    if (hasInvalidParams) {
      router.replace("/transactions");
    }
  }, [params.id, params.id_users, router, routeUserId, transactionId]);

  useEffect(() => {
    if (!userLoading && !relationsLoading && relationsData == null) {
      router.replace("/transactions");
    }
  }, [relationsData, relationsLoading, router, userLoading]);

  const handleRemoveAttachment = useCallback(
    async (attachmentId: string) => {
      if (transaction?.id_users == null || isRemovingAttachment) return;

      try {
        setIsRemovingAttachment(true);
        await attachmentsTransactionService.softDeleteAttachment(
          attachmentId,
          transaction.id_users
        );
        Alert.alert("Anexo removido", "O anexo foi removido com sucesso.");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Não foi possível remover o anexo.";
        Alert.alert("Erro ao remover anexo", message);
      } finally {
        setIsRemovingAttachment(false);
      }
    },
    [isRemovingAttachment, transaction]
  );

  if (!transaction) return null;

  const handleEdit = () => {
    router.push({
      pathname: "/transactions/create",
      params: {
        id_transactions: String(transaction.id_transactions),
        id_users: String(transaction.id_users),
      },
    });
  };
  const handleDelete = () => {
    Alert.alert(
      "Excluir transação",
      "Esta transação será removida das suas movimentações. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await excludeTransaction(
                transaction?.id_transactions,
                transaction?.id_users
              );
              router.replace("/transactions");
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : "Não foi possível excluir a transação.";
              Alert.alert("Erro ao excluir", message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionHeader />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TransactionSummaryCard detail={transaction} currency="BRL" />

          <DetailInfoCard label="Tipo" value={transaction.category} />
          <DetailInfoCard label="Descrição" value={transaction.description} />
          <DetailInfoCard label="Data" value={formatCurrentDatePtBr(parseDateTime(transaction.occured_at))} />
          <DetailInfoCard
            label="Detalhes Adicionais"
            value={transaction.notes || "—"}
          />

          <AttachmentListSection
            attachments={attachments}
            loading={relationsLoading}
            errorMessage={relationsError?.message ?? null}
            onRemoveAttachment={handleRemoveAttachment}
          />

          <TransactionActionButtons
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollView>
      </ScreenContainer>
    </View>
  );
};
