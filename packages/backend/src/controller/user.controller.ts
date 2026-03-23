import { Request, Response } from "express";
import { UserService } from "../service/index.js";
import { ResponseJson, SessionResponse, User } from "@pkg/shared";
import { verifyToken } from "../lib/index.js";
import { UnAuthorizedError, UserUndefinedError } from "../error/index.js";

export const session = () => {
  return async (req: Request, res: Response): Promise<Response<SessionResponse>> => {
    const userService = new UserService();

    const token = req.cookies.token;
    if (!token) {
      throw new UnAuthorizedError();
    }

    const verified = verifyToken(token);
    const user: User | null = await userService.findByEmail(verified.email);
    if (!user) throw new UserUndefinedError();

    const data: SessionResponse = { id: user.id, email: user.email };
    const json: ResponseJson<SessionResponse> = {
      success: true,
      data: data,
      message: "now session active"
    }
    return res.status(200).json(json);
  }
}
