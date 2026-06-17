import type { User } from "../entities/User";
import type { Unsubscribe } from "./Unsubscribe";

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthSession = {
  userId: number;
  email: string;
  displayName: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
};

export interface AuthRepository {
  signIn(email: string, password: string): Promise<AuthSession>;
  signOut(): Promise<void>;
  getCurrentUser(): AuthUser | null;
  observeAuthState(callback: (user: AuthUser | null) => void): Unsubscribe;
  mapError(error: unknown): string;
  getAppUserByLogin(login: string): Promise<User | null>;
}
