import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import type { AuthTokenResponse } from "@/types/auth";
import type { User } from "@/types/user";

const LEGACY_AUTH_TOKEN_RESPONSE_KEY = "@appfobos/auth/tokenResponse";
const LEGACY_APP_USER_KEY = "@appfobos/auth/appUser";
const AUTH_TOKEN_RESPONSE_KEY = "appfobos.auth.tokenResponse";
const APP_USER_KEY = "appfobos.auth.appUser";

const getStoredValue = async (
  key: string,
  legacyKey: string
): Promise<string | null> => {
  const secureValue = await SecureStore.getItemAsync(key);
  if (secureValue != null && secureValue !== "") {
    return secureValue;
  }

  const legacyValue = await AsyncStorage.getItem(legacyKey);
  if (legacyValue == null || legacyValue === "") {
    return null;
  }

  await SecureStore.setItemAsync(key, legacyValue);
  await AsyncStorage.removeItem(legacyKey);
  return legacyValue;
};

const deleteStoredValue = async (
  key: string,
  legacyKey: string
): Promise<void> => {
  await Promise.all([
    SecureStore.deleteItemAsync(key),
    AsyncStorage.removeItem(legacyKey),
  ]);
};

export const persistAuthTokenResponse = async (
  data: AuthTokenResponse
): Promise<void> => {
  await SecureStore.setItemAsync(AUTH_TOKEN_RESPONSE_KEY, JSON.stringify(data));
  await AsyncStorage.removeItem(LEGACY_AUTH_TOKEN_RESPONSE_KEY);
};

export const clearPersistedAuthTokenResponse = async (): Promise<void> => {
  await deleteStoredValue(AUTH_TOKEN_RESPONSE_KEY, LEGACY_AUTH_TOKEN_RESPONSE_KEY);
};

export const getPersistedAuthTokenResponse =
  async (): Promise<AuthTokenResponse | null> => {
    try {
      const raw = await getStoredValue(
        AUTH_TOKEN_RESPONSE_KEY,
        LEGACY_AUTH_TOKEN_RESPONSE_KEY
      );
      if (raw == null || raw === "") {
        return null;
      }
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        typeof (parsed as AuthTokenResponse).email !== "string"
      ) {
        return null;
      }
      const email = (parsed as AuthTokenResponse).email.trim();
      if (email === "") {
        return null;
      }
      return parsed as AuthTokenResponse;
    } catch {
      return null;
    }
  };

export const persistAppUser = async (user: User): Promise<void> => {
  await SecureStore.setItemAsync(APP_USER_KEY, JSON.stringify(user));
  await AsyncStorage.removeItem(LEGACY_APP_USER_KEY);
};

export const clearPersistedAppUser = async (): Promise<void> => {
  await deleteStoredValue(APP_USER_KEY, LEGACY_APP_USER_KEY);
};

export const clearAllPersistedAuth = async (): Promise<void> => {
  await Promise.all([
    clearPersistedAuthTokenResponse(),
    clearPersistedAppUser(),
  ]);
};

const isPersistedUserShape = (parsed: unknown): parsed is User => {
  if (typeof parsed !== "object" || parsed === null) {
    return false;
  }
  const o = parsed as Record<string, unknown>;
  if (typeof o.id_users !== "number" || !Number.isFinite(o.id_users)) {
    return false;
  }
  if (typeof o.name !== "string" || typeof o.login !== "string") {
    return false;
  }
  if (typeof o.budget !== "number" || !Number.isFinite(o.budget)) {
    return false;
  }
  if (typeof o.created_at !== "string") {
    return false;
  }
  if (o.updated_at !== null && typeof o.updated_at !== "string") {
    return false;
  }
  return true;
};

export const getPersistedAppUser = async (): Promise<User | null> => {
  try {
    const raw = await getStoredValue(APP_USER_KEY, LEGACY_APP_USER_KEY);
    if (raw == null || raw === "") {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!isPersistedUserShape(parsed)) {
      return null;
    }
    const login = parsed.login.trim();
    if (login === "") {
      return null;
    }
    return {
      id_users: parsed.id_users,
      name: parsed.name,
      login,
      budget: parsed.budget,
      created_at: parsed.created_at,
      updated_at: parsed.updated_at,
    };
  } catch {
    return null;
  }
};

export const authTokenStorage = {
  persistAuthTokenResponse,
  clearPersistedAuthTokenResponse,
  getPersistedAuthTokenResponse,
  persistAppUser,
  clearPersistedAppUser,
  clearAllPersistedAuth,
  getPersistedAppUser,
};

export type AuthTokenStorage = typeof authTokenStorage;
