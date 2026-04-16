import { getSession } from "@auth/express";
import { Request, Response } from "express";
import { UnAuthorizedError } from "../error/AuthError.js";
import { authConfig } from "./authConfig.js";
import { RegisterRequest, RegisterResponse, ResponseJson, SessionResponse } from "@pkg/shared";
import { UserService } from "../service/user.service.js";
import { UserUndefinedError } from "../error/UserError.js";


export const createUser = async (req: Request, res: Response) => {
  const dto: RegisterRequest = req.body;
  const service = new UserService();

  const user = await service.createUser(dto);

  if (!user) throw new UserUndefinedError();

  const json: ResponseJson<RegisterResponse> = {
    success: true,
    data: user
  }
  res.status(201).json(json);
}


export const session_v2 = async (req: Request, res: Response) => {
  const session = await getSession(req, authConfig);

  if (!session) throw new UnAuthorizedError();

  const json: ResponseJson<SessionResponse> = {
    success: true,
    data: session.user
  }

  res.status(200).json(json);
}
