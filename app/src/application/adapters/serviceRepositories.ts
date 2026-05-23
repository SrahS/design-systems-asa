import type {
  AddAttachmentInput,
  AttachmentRepository,
} from "@/domain/ports/AttachmentRepository";
import type { Attachment } from "@/domain/entities/Attachment";
import type { TransactionId } from "@/domain/entities/Transaction";
import type { AuthRepository, AuthSession } from "@/domain/ports/AuthRepository";
import type { CategoryRepository } from "@/domain/ports/CategoryRepository";
import type { SessionStorage } from "@/domain/ports/SessionStorage";
import type { TransactionRepository } from "@/domain/ports/TransactionRepository";
import {
  clearAllPersistedAuth,
  clearPersistedAppUser,
  clearPersistedAuthTokenResponse,
  getPersistedAppUser,
  getPersistedAuthTokenResponse,
  persistAppUser,
  persistAuthTokenResponse,
} from "@/features/auth/authTokenStorage";
import {
  attachmentsTransactionService,
  authService,
  categoriesService,
  transactionsService,
  usersService,
} from "@/services";
import type { AuthTokenResponse } from "@/types/auth";
import {
  toDomainAttachment,
  toDomainCategory,
  toDomainTransaction,
  toDomainUser,
  toLegacyUser,
} from "./legacyMappers";

export const transactionRepository: TransactionRepository = {
  list: async (userId) => {
    const transactions = await transactionsService.getTransactions(userId);
    return transactions.map(toDomainTransaction);
  },
  getById: async (transactionId, userId) => {
    const transaction = await transactionsService.getTransactionById(
      transactionId,
      userId
    );
    return transaction ? toDomainTransaction(transaction) : null;
  },
  create: async (input) => {
    const transaction = await transactionsService.createTransaction({
      userId: input.userId,
      categoryId: input.categoryId,
      amount: input.amount,
      description: input.description,
      occured_at: input.occurredAt,
      notes: input.notes,
      attachmentsCount: input.attachmentsCount,
    });
    return toDomainTransaction(transaction);
  },
  update: async (input) => {
    const transaction = await transactionsService.updateTransaction({
      transactionId: input.transactionId,
      userId: input.userId,
      categoryId: input.categoryId,
      amount: input.amount,
      description: input.description,
      occured_at: input.occurredAt,
      notes: input.notes,
      attachmentsCount: input.attachmentsCount,
    });
    return toDomainTransaction(transaction);
  },
  exclude: transactionsService.excludeTransaction,
  applyAttachmentCount: transactionsService.applyAttachmentCount,
};

export const categoryRepository: CategoryRepository = {
  list: async () => {
    const categories = await categoriesService.getCategories();
    return categories.map(toDomainCategory);
  },
  getById: async (categoryId) => {
    const category = await categoriesService.getCategoryById(categoryId);
    return category ? toDomainCategory(category) : null;
  },
};

export const attachmentRepository: AttachmentRepository = {
  list: async (userId) => {
    const attachments = await attachmentsTransactionService.getAttachments(userId);
    return attachments.map(toDomainAttachment);
  },
  listByTransaction: async (transactionId, userId) => {
    const attachments =
      await attachmentsTransactionService.getAttachmentsByTransactionId(
        transactionId,
        userId
      );
    return attachments.map(toDomainAttachment);
  },
  listByTransactionMap: async (userId) => {
    const legacyMap =
      await attachmentsTransactionService.getAttachmentsByTransactionMap(userId);
    const mapped = new Map<TransactionId, Attachment[]>();
    legacyMap.forEach((attachments, transactionId) => {
      mapped.set(transactionId, attachments.map(toDomainAttachment));
    });
    return mapped;
  },
  add: async (input: AddAttachmentInput) => {
    const attachment = await attachmentsTransactionService.addAttachment({
      transactionId: input.transactionId,
      userId: input.userId,
      file_name: input.fileName,
      uri: input.uri,
      mimeType: input.mimeType,
    });
    return toDomainAttachment(attachment);
  },
  softDelete: attachmentsTransactionService.softDeleteAttachment,
  commitDraftsForTransaction: async (drafts, transactionId, userId) => {
    await attachmentsTransactionService.commitDraftsForTransaction(
      drafts.map((draft) => ({
        clientId: draft.clientId,
        id_transactions: draft.transactionId,
        file_name: draft.fileName,
        mimeType: draft.mimeType,
        uri: draft.uri,
      })),
      transactionId,
      userId
    );
  },
};

const toSession = (tokenResponse: AuthTokenResponse): AuthSession => ({
  userId: tokenResponse.id_users,
  email: tokenResponse.email,
  displayName: tokenResponse.displayName,
  idToken: tokenResponse.idToken,
  refreshToken: tokenResponse.refreshToken,
  expiresIn: tokenResponse.expiresIn,
});

const toTokenResponse = (session: AuthSession): AuthTokenResponse => ({
  displayName: session.displayName,
  email: session.email,
  expiresIn: session.expiresIn,
  idToken: session.idToken,
  kind: "identitytoolkit#VerifyPasswordResponse",
  localId: "",
  refreshToken: session.refreshToken,
  registered: true,
  id_users: session.userId,
});

export const authRepository: AuthRepository = {
  signIn: async (email, password) => {
    const tokenResponse = await authService.signIn(email, password);
    return toSession(tokenResponse);
  },
  signOut: authService.signOut,
  getCurrentUser: authService.getCurrentUser,
  observeAuthState: authService.observeAuthState,
  mapError: authService.mapAuthError,
  getAppUserByLogin: async (login) => {
    const user = await usersService.getUserByFirestoreLogin(login);
    return user ? toDomainUser(user) : null;
  },
};

export const sessionStorage: SessionStorage = {
  saveSession: async (session) => {
    await persistAuthTokenResponse(toTokenResponse(session));
  },
  getSession: async () => {
    const tokenResponse = await getPersistedAuthTokenResponse();
    return tokenResponse ? toSession(tokenResponse) : null;
  },
  clearSession: clearPersistedAuthTokenResponse,
  saveUser: async (user) => {
    await persistAppUser(toLegacyUser(user));
  },
  getUser: async () => {
    const user = await getPersistedAppUser();
    return user ? toDomainUser(user) : null;
  },
  clearUser: clearPersistedAppUser,
  clearAll: clearAllPersistedAuth,
};
