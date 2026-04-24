import { CookieOptions, Request, Response } from "express";
import { RegisterService, UserService } from "../service/index.js";
import { LoginRequest, LoginResponse, LogoutResponse, MeResponse, RegisterRequest, RegisterResponse, ResponseJson, SessionResponse, User } from "@pkg/shared";
import { LoginStateManagementService } from "../service/index.js";
import { ENV } from "../config/env.js";
import { UserUndefinedError } from "../error/UserError.js";
import { UnAuthorizedError } from "../error/AuthError.js";
import { verifyToken } from "../lib/jwt.js";


const env = ENV.NODE_ENV;

const tokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env === "production",
  sameSite: env === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24, // 1日
};


export const register = async (req: Request, res: Response) => {
  const dto: RegisterRequest = req.body;
  const registerService = new RegisterService();

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



export const login = async (req: Request, res: Response): Promise<Response<LoginResponse>> => {
  const dto: LoginRequest = req.body;
  const service = new LoginStateManagementService();

  const result = await service.login({ email: dto.email, password: dto.password });

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


export const session = async (req: Request, res: Response): Promise<Response<SessionResponse>> => {
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
    data,
    message: "now session active"
  }
  return res.status(200).json(json);
}


export const me = async (req: Request, res: Response) => {
  const service = new UserService();

  const id = res.locals.userId;

  const user = await service.findById(id);
  if (user === null) throw new UserUndefinedError();

  const json: ResponseJson<MeResponse> = {
    success: true,
    data: user
  }
  res.status(200).json(json);
}
