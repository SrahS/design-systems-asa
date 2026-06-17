import type { AuthRepository, AuthSession } from "@/domain/ports/AuthRepository";
import type { SessionStorage } from "@/domain/ports/SessionStorage";

export class SignIn {
  constructor(
    private readonly auth: AuthRepository,
    private readonly sessionStorage: SessionStorage
  ) {}

  execute = async (email: string, password: string): Promise<AuthSession> => {
    const session = await this.auth.signIn(email.trim(), password);
    await this.sessionStorage.saveSession(session);
    return session;
  };

  mapError = (error: unknown): string => this.auth.mapError(error);
}
