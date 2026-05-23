import type {
  Attachment,
  AttachmentDraft,
} from "@/domain/entities/Attachment";
import type { TransactionId } from "@/domain/entities/Transaction";
import type { UserId } from "@/domain/entities/User";
import type {
  AddAttachmentInput,
  AttachmentRepository,
} from "@/domain/ports/AttachmentRepository";

export class UploadAttachment {
  constructor(private readonly attachments: AttachmentRepository) {}

  execute = async (input: AddAttachmentInput): Promise<Attachment> => {
    return this.attachments.add({
      ...input,
      fileName: input.fileName.trim(),
    });
  };

  commitDraftsForTransaction = async (
    drafts: AttachmentDraft[],
    transactionId: TransactionId,
    userId: UserId
  ): Promise<void> => {
    await this.attachments.commitDraftsForTransaction(
      drafts,
      transactionId,
      userId
    );
  };
}
