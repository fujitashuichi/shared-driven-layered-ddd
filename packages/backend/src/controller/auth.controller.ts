import { CookieOptions, Request, Response } from "express";
import { RegisterService, UserService } from "../service/index.js";
import { Database } from "sqlite3";
import { LoginRequest, LoginResponse, LogoutResponse, MeResponse, RegisterRequest, RegisterResponse, ResponseJson } from "@pkg/shared";
import { LoginStateManagementService } from "../service/index.js";
import { ENV } from "../config/env.js";
import { verifyToken } from "../lib/jwt.js";
import { UserUndefinedError } from "../error/UserError.js";
import { UnAuthorizedError } from "../error/AuthError.js";

const env = ENV.NODE_ENV;

const tokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env === "product",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24, // 1日
};


export const register = (db: Database) => {
  return async (req: Request, res: Response) => {
    const dto: RegisterRequest = req.body;
    const registerService = new RegisterService(db);

    const registerResult = await registerService.registerUser(dto);

    const json: ResponseJson<RegisterResponse> = {
      success: true,
      data: registerResult.user
    }
    return res
      .status(201)
      .cookie("token", registerResult.token, tokenCookieOptions)
      .json(json);
  }
}



export const login = (db: Database) => {
  return async (req: Request, res: Response): Promise<Response<LoginResponse>> => {
    const dto: LoginRequest = req.body;
    const service = new LoginStateManagementService(db);

    const result = await service.tryLogin({ email: dto.email, password: dto.password });

    console.info("Login succeed");
    const json: ResponseJson<LoginResponse> = {
      success: true,
      data: {},
      message: "successfully logged in"
    }
    return res
      .status(200)
      .cookie("token", result.token, tokenCookieOptions)
      .json(json);
  }
}

export const logout = (_: Request, res: Response) => {
  const json: ResponseJson<LogoutResponse> = {
    success: true,
    data: {},
    message: "successfully logged out"
  };
  res.clearCookie("token", tokenCookieOptions)
    .status(200)
    .json(json);

  return console.info("Logout succeed");
}

export const me = (db: Database) => {
  return async (req: Request, res: Response) => {
    const service = new UserService(db);

    const token = req.cookies.token;
    if (!token) throw new UnAuthorizedError();

    const verified = verifyToken(token);

    const user = await service.findByEmail(verified.email);
    if (user === null) throw new UserUndefinedError();

    const json: ResponseJson<MeResponse> = {
      success: true,
      data: user
    }
    res.status(200).json(json);
  }
}
