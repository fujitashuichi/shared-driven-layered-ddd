import { Response } from "express";
import { errorResponse } from "../errorResponse.js";
import { UserError, UserUndefinedError } from "../../../error/UserError.js";

export const userErrorHandler = (err: Error, res: Response): boolean => {
  if (err instanceof UserUndefinedError) {
    errorResponse(res, 404, err);
    return true;
  }


  if (err instanceof UserError) {
    errorResponse(res, 500, err);
    return true;
  }

  return false;
}
