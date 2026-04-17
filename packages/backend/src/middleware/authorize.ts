import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError, UserUndefinedError } from "../error/index.js";
import { getSession } from "@auth/express";
import { authConfig } from "../config/authConfig.js";


export const authorize = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await getSession(req, authConfig);

    if (!session) throw new UnAuthorizedError();
    if (!session.user) throw new UserUndefinedError();

    res.locals.userId = session.user.id;

    next();
  }
}
