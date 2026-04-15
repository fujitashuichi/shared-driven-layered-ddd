import { getSession } from "@auth/express";
import { authConfig } from "../middleware/authorize_v2.js";
import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../error/AuthError.js";


export const session_v2 = async (req: Request, res: Response, next: NextFunction) => {
  const session = await getSession(req, authConfig);

  if (!session) throw new UnAuthorizedError();

  res.status(200).json(session.user);

  next();
}
