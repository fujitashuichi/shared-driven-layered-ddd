import { Request, Response } from "express";
import { UserService } from "../service/index.js";
import { SessionResponse } from "@pkg/shared";
import { verifyToken } from "../lib/index.js";
import { User } from "../types/index.js";
import { Database } from "sqlite3";
import { UserUndefinedError } from "../error/UserError.js";
import { UnAuthorizedError } from "../error/UserAuthError.js";

export const session = (db: Database) => {
  return async (req: Request, res: Response): Promise<Response<SessionResponse>> => {
    const userService = new UserService(db);

    const token = req.cookies.token;
    if (!token) {
      throw new UnAuthorizedError();
    }

    const verified = verifyToken(token);
    const user: User | null = await userService.findByEmail(verified.email);
    if (!user) throw new UserUndefinedError();

    const resBody: SessionResponse = { id: user.id, email: user.email };
    return res.status(200).json(resBody);
  }
}
