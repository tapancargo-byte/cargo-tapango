// @ts-nocheck
export const TurboModuleRegistry = {};
export const requireNativeModule = () => ({});
export const requireOptionalNativeModule = () => null;
export const Platform = { OS: 'web', select: (o: any) => o.web ?? o.default };
export class CodedError extends Error {}
export class UnavailabilityError extends Error {}
export default {};
