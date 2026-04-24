import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError, UserUndefinedError } from "../error/index.js";
import { verifyToken } from "../lib/jwt.js";
import { UserService } from "../service/user.service.js";


export const authorize = async (req: Request, res: Response, next: NextFunction, ) => {
  const service = new UserService();
  const token: string | undefined = req.cookies?.token;

  if (!token) throw new UnAuthorizedError();

  const verified = verifyToken(token);
  const user = await service.findByEmail(verified.email);

  if (!user) throw new UserUndefinedError();
  res.locals.userId = user.id;

  next();
}
