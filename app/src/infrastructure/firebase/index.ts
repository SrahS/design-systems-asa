import {
  attachmentsTransactionService,
  type AttachmentsTransactionService,
} from "./attachmentsTransaction";
import { authService, type AuthService } from "./authService";
import { categoriesService, type CategoriesService } from "./categories";
import {
  transactionsService,
  type TransactionsService,
} from "./transactions";
import { usersService, type UsersService } from "./users";

export * from "./authService";
export * from "./attachmentsTransaction";
export * from "./categories";
export * from "./firebase";
export * from "./transactions";
export * from "./users";

export type FirebaseInfrastructure = {
  attachmentsTransactionService: AttachmentsTransactionService;
  authService: AuthService;
  categoriesService: CategoriesService;
  transactionsService: TransactionsService;
  usersService: UsersService;
};

export const firebaseInfrastructure: FirebaseInfrastructure = {
  attachmentsTransactionService,
  authService,
  categoriesService,
  transactionsService,
  usersService,
};
