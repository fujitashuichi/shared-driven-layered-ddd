import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { authErrorHandler } from "./domain/authErrorHandler.js";
import { productErrorHandler } from "./domain/productErrorHandler.js";
import { userErrorHandler } from "./domain/userErrorHandler.js";
import { SecurityErrorHandler } from "./domain/SecurityErrorHandler.js";

export const globalErrorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (authErrorHandler(err, res)) return;
  if (productErrorHandler(err, res)) return;
  if (userErrorHandler(err, res)) return;
  if (SecurityErrorHandler(err, res)) return;

  return res.status(500).json({
    message: "Internal Server Error"
  });
};
