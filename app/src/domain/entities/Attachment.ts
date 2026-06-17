import type { TransactionId } from "./Transaction";
import type { UserId } from "./User";

export type AttachmentId = string;

export type Attachment = {
  id: AttachmentId;
  transactionId: TransactionId;
  userId: UserId;
  fileName: string;
  fileUrl: string;
  storagePath: string;
  uploadedAt: string;
  excludedAt: string | null;
};

export type AttachmentDraft = {
  clientId: string;
  transactionId: TransactionId | null;
  fileName: string;
  mimeType?: string | null;
  uri: string;
};
