import type { Attachment as DomainAttachment } from "@/domain/entities/Attachment";
import type { Category as DomainCategory } from "@/domain/entities/Category";
import type { Transaction as DomainTransaction } from "@/domain/entities/Transaction";
import type { User as DomainUser } from "@/domain/entities/User";
import type { AttachmentTransaction } from "@/types/attachmentTransaction";
import type { Category } from "@/types/category";
import type { Transaction } from "@/types/transaction";
import type { User } from "@/types/user";

export const toDomainTransaction = (
  transaction: Transaction
): DomainTransaction => ({
  id: transaction.id_transactions,
  userId: transaction.id_users,
  categoryId: transaction.id_categories,
  amount: transaction.amount,
  description: transaction.description,
  occurredAt: transaction.occured_at,
  notes: transaction.notes,
  excluded: transaction.excluded,
  attachmentCount: transaction.attachment_count,
  createdAt: transaction.created_at,
  updatedAt: transaction.updated_at,
});

export const toLegacyTransaction = (
  transaction: DomainTransaction
): Transaction => ({
  id_transactions: transaction.id,
  id_users: transaction.userId,
  id_categories: transaction.categoryId,
  amount: transaction.amount,
  description: transaction.description,
  occured_at: transaction.occurredAt,
  notes: transaction.notes,
  excluded: transaction.excluded,
  attachment_count: transaction.attachmentCount,
  created_at: transaction.createdAt,
  updated_at: transaction.updatedAt,
});

export const toDomainCategory = (category: Category): DomainCategory => ({
  id: category.id_categories,
  name: category.name,
  color: category.color,
  icon: category.icon,
});

export const toLegacyCategory = (category: DomainCategory): Category => ({
  id_categories: category.id,
  name: category.name,
  color: category.color,
  icon: category.icon,
});

export const toDomainAttachment = (
  attachment: AttachmentTransaction
): DomainAttachment => ({
  id: attachment.id_attachments,
  transactionId: attachment.id_transactions,
  userId: attachment.id_users,
  fileName: attachment.file_name,
  fileUrl: attachment.file_url,
  storagePath: attachment.storage_path,
  uploadedAt: attachment.uploaded_at,
  excludedAt: attachment.excluded_at,
});

export const toLegacyAttachment = (
  attachment: DomainAttachment
): AttachmentTransaction => ({
  id_attachments: attachment.id,
  id_transactions: attachment.transactionId,
  id_users: attachment.userId,
  file_name: attachment.fileName,
  file_url: attachment.fileUrl,
  storage_path: attachment.storagePath,
  uploaded_at: attachment.uploadedAt,
  excluded_at: attachment.excludedAt,
});

export const toDomainUser = (user: User): DomainUser => ({
  id: user.id_users,
  name: user.name,
  login: user.login,
  budget: user.budget,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

export const toLegacyUser = (user: DomainUser): User => ({
  id_users: user.id,
  name: user.name,
  login: user.login,
  budget: user.budget,
  created_at: user.createdAt,
  updated_at: user.updatedAt,
});
