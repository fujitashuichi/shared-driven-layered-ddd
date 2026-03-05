import { Request, Response } from "express";
import { stringValidator } from "../validator/stringValidator.js";

export const securityGuard = (req: Request, res: Response): boolean => {
  const dto = req.body;

  for (const key in dto) {
    if (typeof dto[key] === "string") {
      const result = stringValidator(dto[key]);
      if (!result) {
        res.status(400).send({
          success: false,
          message: "Invalid Characters Detected"
        });

        console.error("Invalid Characters Detected");

        return false;
      }
    }
  }

  return true;
}
