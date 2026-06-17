import type { User } from "../entities/User";
import type { AuthSession } from "./AuthRepository";

export interface SessionStorage {
  saveSession(session: AuthSession): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  clearSession(): Promise<void>;
  saveUser(user: User): Promise<void>;
  getUser(): Promise<User | null>;
  clearUser(): Promise<void>;
  clearAll(): Promise<void>;
}
