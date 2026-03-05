import { LoginRequestSchema, PostProjectRequestSchema, RegisterRequestSchema } from "@pkg/shared";
import { Request, Response } from "express";

export type RequestName = "register" | "login" | "postProject";

const dtoSchemaMap = {
  register: RegisterRequestSchema,
  login: LoginRequestSchema,
  postProject: PostProjectRequestSchema
} as const;


export const zodGuard = (req: Request, res: Response, requestName: RequestName) => {
  const parsedDto = dtoSchemaMap[requestName].safeParse(req.body);

  if (!parsedDto.success) {
    res.status(400).send({
      success: false,
      message: "Invalid RequestData: " + parsedDto.error.message
    });

    console.error("Invalid RequestData");

    return false;
  }

  req.body = parsedDto.data;

  return true;
}
