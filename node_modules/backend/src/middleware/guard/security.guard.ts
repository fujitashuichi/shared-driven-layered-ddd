import { Request } from "express";
import { stringValidator } from "../../validator/stringValidator.js";
import { InvalidCharacterDetectedError } from "../../error/SecurityError.js";

export const securityGuard = (req: Request) => {
  const dto = req.body;

  for (const key in dto) {
    if (typeof dto[key] === "string") {
      const result = stringValidator(dto[key]);
      if (!result) {
        throw new InvalidCharacterDetectedError();
      }
    }
  }
}
