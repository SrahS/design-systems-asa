import { firebaseInfrastructure } from "@/infrastructure/firebase";
import { authTokenStorage } from "@/infrastructure/storage";
import { createServiceRepositories } from "./adapters/serviceRepositories";

export const applicationRepositories = createServiceRepositories({
  ...firebaseInfrastructure,
  authTokenStorage,
});
