import { Response } from "express";
import { DuplicateProjectError, ProjectError, ProjectUndefinedError } from "../../../error/index.js";
import { errorResponse } from "../errorResponse.js";

export const productErrorHandler = (err: Error, res: Response): boolean => {
  // postProduct
  if (err instanceof DuplicateProjectError) {
    errorResponse(res, 400, err);
    return true;
  }

  if (err instanceof ProjectUndefinedError) {
    errorResponse(res, 404, err);
    return true;
  }


  if (err instanceof ProjectError) {
    errorResponse(res, 400, err);
    return true;
  }

  return false;
}
