import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { initializeApp, type FirebaseOptions } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

type FirebaseConfigKey = keyof FirebaseOptions;
type FirebaseExtraConfig = Partial<Record<FirebaseConfigKey, string>>;

const getFirebaseExtraConfig = (): FirebaseExtraConfig => {
  const firebase = Constants.expoConfig?.extra?.firebase;
  if (typeof firebase !== "object" || firebase === null) {
    return {};
  }
  return firebase as FirebaseExtraConfig;
};

const readFirebaseConfigValue = (
  extra: FirebaseExtraConfig,
  key: FirebaseConfigKey,
  envName: string
): string => {
  const value = extra[key]?.trim() ?? "";
  if (value === "") {
    throw new Error(`Missing Firebase configuration value: ${envName}`);
  }
  return value;
};

const firebaseExtraConfig = getFirebaseExtraConfig();
const firebaseConfig: FirebaseOptions = {
  apiKey: readFirebaseConfigValue(
    firebaseExtraConfig,
    "apiKey",
    "EXPO_PUBLIC_FIREBASE_API_KEY"
  ),
  authDomain: readFirebaseConfigValue(
    firebaseExtraConfig,
    "authDomain",
    "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"
  ),
  projectId: readFirebaseConfigValue(
    firebaseExtraConfig,
    "projectId",
    "EXPO_PUBLIC_FIREBASE_PROJECT_ID"
  ),
  storageBucket: readFirebaseConfigValue(
    firebaseExtraConfig,
    "storageBucket",
    "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"
  ),
  messagingSenderId: readFirebaseConfigValue(
    firebaseExtraConfig,
    "messagingSenderId",
    "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
  ),
  appId: readFirebaseConfigValue(
    firebaseExtraConfig,
    "appId",
    "EXPO_PUBLIC_FIREBASE_APP_ID"
  ),
};

export const app = initializeApp(firebaseConfig);

const createAuth = () => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
};

export const auth = createAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
