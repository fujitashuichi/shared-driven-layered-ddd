import { CookieOptions, Request, Response } from "express";
import { RegisterService } from "../service/index.js";
import { Database } from "sqlite3";
import { IsLoggedInResponse, LoginRequest, LoginResponse, RegisterRequest } from "@pkg/shared";
import { LoginStateManagementService } from "../service/index.js";


const tokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24, // 1日
}

export const register = async (req: Request, res: Response, db: Database) => {
  const dto: RegisterRequest = req.body;
  const registerService = new RegisterService(db);

  const registerResult = await registerService.registerUser(dto);

  return res
    .status(201)
    .cookie("token", registerResult.token, tokenCookieOptions)
    .send({
      success: true,
      user: registerResult.user
    });
}


export const isLoggedIn = async (req: Request, res: Response): Promise<Response<IsLoggedInResponse>> => {
  const cookie = await req.cookies.token;

  if (!cookie) {
    return res.status(401).send({
      success: false,
      isLoggedIn: false
    })
  }

  return res.status(200).send({
    success: true,
    isLoggedIn: true
  })
}

export const login = async (req: Request, res: Response, db: Database): Promise<Response<LoginResponse>> => {
  const dto: LoginRequest = req.body;
  const service = new LoginStateManagementService(db);

  const result = await service.tryLogin({ email: dto.email, password: dto.password });

  console.info("Login succeed");
  return res
    .status(200)
    .cookie("token", result.token, tokenCookieOptions)
    .send({
      success: true
    });
}

export const logout = async (_: Request, res: Response) => {
  res.clearCookie("token", tokenCookieOptions)
    .status(200)
    .send({ message: "successfully logged out" });
}
