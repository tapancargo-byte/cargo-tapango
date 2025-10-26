// @ts-nocheck
export const TurboModuleRegistry = {};
export const requireNativeModule = () => ({});
export const requireOptionalNativeModule = () => null;
export const Platform = { OS: 'web', select: (o: any) => o.web ?? o.default };
export class CodedError extends Error {}
export class UnavailabilityError extends Error {}
// Minimal permission stubs expected by certain Expo packages (e.g., expo-image-picker)
export const PermissionStatus = {
  UNDETERMINED: 'undetermined',
  DENIED: 'denied',
  GRANTED: 'granted',
} as const;

export const createPermissionHook = (_module: any, _method: string) => {
  // Return a hook that yields a permissive response and no-op request functions
  return function usePermission() {
    const response: any = {
      canAskAgain: true,
      expires: 'never',
      granted: true,
      status: PermissionStatus.GRANTED,
    };
    const requestPermission = async () => response;
    const getPermission = async () => response;
    return [response, requestPermission, getPermission] as const;
  };
};
export default {};
