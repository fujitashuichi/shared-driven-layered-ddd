import { Response } from "express";
import { ConfirmPasswordError, EmailAlreadyRegisteredError, InvalidPasswordError, UnAuthorizedError, UserAuthError } from "../../../error/UserAuthError.js";
import { errorResponse } from "../errorResponse.js";

export const authErrorHandler = (err: Error, res: Response): boolean => {
  if (err instanceof UnAuthorizedError) {
    errorResponse(res, 401, err);
    return true;
  }

  // register
  if (err instanceof EmailAlreadyRegisteredError) {
    errorResponse(res, 409, err);
    return true;
  }

  if (err instanceof InvalidPasswordError) {
    errorResponse(res, 400, err);
    return true;
  }

  // login
  if (err instanceof ConfirmPasswordError) {
    errorResponse(res, 401, err);
    return true;
  }


  if (err instanceof UserAuthError) {
    errorResponse(res, 400, err);
    return true;
  }

  return false;
}
