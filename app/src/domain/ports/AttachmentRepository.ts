import type {
  Attachment,
  AttachmentDraft,
  AttachmentId,
} from "../entities/Attachment";
import type { TransactionId } from "../entities/Transaction";
import type { UserId } from "../entities/User";
import type { Unsubscribe } from "./Unsubscribe";

export type AddAttachmentInput = {
  transactionId: TransactionId;
  userId: UserId;
  fileName: string;
  uri: string;
  mimeType?: string | null;
};

export interface AttachmentRepository {
  list(userId: UserId): Promise<Attachment[]>;
  listByTransaction(
    transactionId: TransactionId,
    userId: UserId
  ): Promise<Attachment[]>;
  listByTransactionMap(
    userId: UserId
  ): Promise<Map<TransactionId, Attachment[]>>;
  add(input: AddAttachmentInput): Promise<Attachment>;
  softDelete(attachmentId: AttachmentId, userId: UserId): Promise<void>;
  commitDraftsForTransaction(
    drafts: AttachmentDraft[],
    transactionId: TransactionId,
    userId: UserId
  ): Promise<void>;
  observe?(
    userId: UserId,
    onChange: (attachments: Attachment[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe;
}
