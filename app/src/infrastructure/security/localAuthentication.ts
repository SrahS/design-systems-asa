import * as LocalAuthentication from "expo-local-authentication";

export const canUseLocalAuthentication = async (): Promise<boolean> => {
  const [hasHardware, isEnrolled] = await Promise.all([
    LocalAuthentication.hasHardwareAsync(),
    LocalAuthentication.isEnrolledAsync(),
  ]);

  return hasHardware && isEnrolled;
};

export const requestLocalAuthentication = async (): Promise<boolean> => {
  const available = await canUseLocalAuthentication();
  if (!available) {
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Confirme sua identidade para acessar o AppFobos",
    cancelLabel: "Cancelar",
    disableDeviceFallback: false,
  });

  return result.success;
};
