import { Request, Response } from "express";
import { RegisterService } from "../service/index.js";
import { Database } from "sqlite3";
import { IsLoggedInResponse, RegisterRequest } from "@pkg/shared";

export const register = async (req: Request, res: Response, db: Database) => {
  const dto: RegisterRequest = req.body;
  const registerService = new RegisterService(db);

  const registerResult = await registerService.registerUser(dto);

  return res
    .status(201)
    .cookie("token", registerResult.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1日
    })
    .send({
      success: true
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
