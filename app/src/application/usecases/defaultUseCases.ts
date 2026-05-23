import { applicationRepositories } from "../container";
import { CreateTransaction } from "./CreateTransaction";
import { ExcludeTransaction } from "./ExcludeTransaction";
import { GetDashboard } from "./GetDashboard";
import { ListTransactions } from "./ListTransactions";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { UpdateTransaction } from "./UpdateTransaction";
import { UploadAttachment } from "./UploadAttachment";

const {
  attachmentRepository,
  authRepository,
  categoryRepository,
  sessionStorage,
  transactionRepository,
} = applicationRepositories;

export const listTransactionsUseCase = new ListTransactions(
  transactionRepository
);
export const createTransactionUseCase = new CreateTransaction(
  transactionRepository
);
export const updateTransactionUseCase = new UpdateTransaction(
  transactionRepository,
  categoryRepository
);
export const excludeTransactionUseCase = new ExcludeTransaction(
  transactionRepository
);
export const uploadAttachmentUseCase = new UploadAttachment(
  attachmentRepository
);
export const signInUseCase = new SignIn(authRepository, sessionStorage);
export const signOutUseCase = new SignOut(authRepository, sessionStorage);
export const getDashboardUseCase = new GetDashboard(
  transactionRepository,
  categoryRepository
);
