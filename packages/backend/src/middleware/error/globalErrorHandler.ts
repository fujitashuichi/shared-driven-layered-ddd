import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { authErrorHandler } from "./domain/authErrorHandler.js";
import { productErrorHandler } from "./domain/projectErrorHandler.js";
import { userErrorHandler } from "./domain/userErrorHandler.js";
import { SecurityErrorHandler } from "./domain/SecurityErrorHandler.js";
import { ResponseJson } from "@pkg/shared";
import { styleText } from "node:util";

export const globalErrorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  process.stdout.write(styleText(
    ["red", "bold"],
    `\n\n` +
    `- -`.repeat(3) + ` globalErrorHandler ` + `- -`.repeat(3) +
    `\n\n${err.stack}\n\n` +
    `- -`.repeat(13) +
    `\n\n`
  ));

  if (authErrorHandler(err, res)) return;
  if (productErrorHandler(err, res)) return;
  if (userErrorHandler(err, res)) return;
  if (SecurityErrorHandler(err, res)) return;

  const json:ResponseJson<undefined> = {
    success: false,
    errorName: "InternalServerError"
  }
  return res.status(500).json(json);
};
