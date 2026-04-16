import { getSession } from "@auth/express";
import { Request, Response } from "express";
import { UnAuthorizedError } from "../error/AuthError.js";
import { authConfig } from "./authConfig.js";


export const session_v2 = async (req: Request, res: Response) => {
  const session = await getSession(req, authConfig);

  if (!session) throw new UnAuthorizedError();

  res.status(200).json(session.user);
}
