import type { AuthRepository } from "@/domain/ports/AuthRepository";
import type { SessionStorage } from "@/domain/ports/SessionStorage";

export class SignOut {
  constructor(
    private readonly auth: AuthRepository,
    private readonly sessionStorage: SessionStorage
  ) {}

  execute = async (): Promise<void> => {
    await this.sessionStorage.clearAll();
    await this.auth.signOut();
  };
}
