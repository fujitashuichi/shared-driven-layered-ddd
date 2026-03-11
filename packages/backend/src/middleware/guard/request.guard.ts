import { NextFunction, Request, Response } from "express";
import { RequestName, zodGuard } from "./zod.guard.js";
import { securityGuard } from "./security.guard.js";

export const requestValidator = (requestName: RequestName) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!securityGuard(req, res)) return;
    if (!zodGuard(req, res, requestName)) return;

    next();
  }
}
