import { Response } from "express";
import { InvalidCharacterDetectedError, InvalidRequestDataError, SecurityError } from "../../../error/SecurityError.js";
import { errorResponse } from "../errorResponse.js";

export const SecurityErrorHandler = (err: Error, res: Response) => {
  if (err instanceof InvalidCharacterDetectedError) {
    errorResponse(res, 400, err);
    return true;
  }

  if (err instanceof InvalidRequestDataError) {
    errorResponse(res, 400, err);
    return true;
  }


  if (err instanceof SecurityError) {
    errorResponse(res, 400, err);
    return true;
  }

  return false;
}
