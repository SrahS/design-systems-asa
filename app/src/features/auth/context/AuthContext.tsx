import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  signInUseCase,
  signOutUseCase,
} from "@/application/usecases/defaultUseCases";
import { authService, type AuthUser } from "@/services/authService";
import type { AuthSession } from "@/domain/ports/AuthRepository";

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | { ok: true; session: AuthSession }
    | { ok: false; message: string }
  >;
  signOut: () => Promise<void>;
};

export const AuthStateContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.observeAuthState((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const session = await signInUseCase.execute(email, password);
      return { ok: true as const, session };
    } catch (err) {
      const message = signInUseCase.mapError(err);
      setError(message);
      return { ok: false as const, message };
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    await signOutUseCase.execute();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      loading,
      error,
      signIn,
      signOut,
    }),
    [user, loading, error, signIn, signOut]
  );

  return (
    <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>
  );
};
