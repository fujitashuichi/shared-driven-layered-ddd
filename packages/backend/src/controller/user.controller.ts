import { Request, Response } from "express";
import { UserService } from "../service/index.js";
import { SessionResponse } from "@pkg/shared";
import { verifyToken } from "../lib/index.js";
import { User } from "../types/index.js";
import { UserUndefinedError } from "../error/index.js";
import { Database } from "sqlite3";

export const session = async (req: Request, res: Response, db: Database): Promise<Response<SessionResponse>> => {
  const userService = new UserService(db);

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({
      success: false,
      user: null
    })
  }

  const verified = verifyToken(token);
  const user: User | null = await userService.findByEmail(verified.email);
  if (!user) throw new UserUndefinedError();

  const resBody: SessionResponse = {
    success: true,
    user: { id: user.id, email: user.email }
  }
  return res.status(200).send(resBody);
}