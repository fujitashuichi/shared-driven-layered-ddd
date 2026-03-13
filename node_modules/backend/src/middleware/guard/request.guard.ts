import { NextFunction, Request, Response } from "express";
import { RequestName, zodGuard } from "./zod.guard.js";
import { securityGuard } from "./security.guard.js";

export const requestValidator = (requestName: RequestName) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      securityGuard(req);
      zodGuard(requestName, req);

      next();
    } catch(err: unknown) {
      next(err);
    }
  }
}
