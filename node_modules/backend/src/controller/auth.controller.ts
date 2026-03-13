import { CookieOptions, Request, Response } from "express";
import { RegisterService } from "../service/index.js";
import { Database } from "sqlite3";
import { LoginRequest, LoginResponse, RegisterRequest } from "@pkg/shared";
import { LoginStateManagementService } from "../service/index.js";
import { ENV } from "../config/env.js";

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

    return res
      .status(201)
      .cookie("token", registerResult.token, tokenCookieOptions)
      .json(registerResult.user);
  }
}



export const login = (db: Database) => {
  return async (req: Request, res: Response): Promise<Response<LoginResponse>> => {
    const dto: LoginRequest = req.body;
    const service = new LoginStateManagementService(db);

    const result = await service.tryLogin({ email: dto.email, password: dto.password });

    console.info("Login succeed");
    return res
      .status(200)
      .cookie("token", result.token, tokenCookieOptions)
      .json({ message: "successfully logged in" });
  }
}

export const logout = (_: Request, res: Response) => {
  res.clearCookie("token", tokenCookieOptions)
    .status(200)
    .json({ message: "successfully logged out" });

  return console.info("Logout succeed");
}
