import { stringValidator } from "../validator/stringValidator.js";

export const userDbSecurityGuard = (dto: Record<string, any>) => {
  for (const key in dto) {
    if (typeof dto[key] === "string" && !stringValidator(dto[key])) {
      throw new Error(`Invalid characters detected in field: ${key}`);
    }
  }
};
