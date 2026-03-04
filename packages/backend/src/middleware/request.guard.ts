import { LoginRequestSchema, PostProjectRequestSchema, RegisterRequestSchema } from "@pkg/shared";
import { NextFunction, Request, Response } from "express";

type RequestName = "register" | "login" | "postProject";

const dtoSchemaMap = {
  register: RegisterRequestSchema,
  login: LoginRequestSchema,
  postProject: PostProjectRequestSchema
} as const;


export const requestValidator = (req: Request, res: Response, next: NextFunction, requestName: RequestName) => {
  const parsedDto = dtoSchemaMap[requestName].safeParse(req.body);

  if (!parsedDto.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid RequestData: " + parsedDto.error.message
    });
  }

  req.body = parsedDto.data;

  next();
}
