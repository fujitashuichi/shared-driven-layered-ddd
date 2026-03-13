import { LoginRequestSchema, PostProjectRequestSchema, RegisterRequestSchema } from "@pkg/shared";
import { Request } from "express";
import { InvalidRequestDataError } from "../../error/SecurityError.js";

export type RequestName = "register" | "login" | "postProject";

const dtoSchemaMap = {
  register: RegisterRequestSchema,
  login: LoginRequestSchema,
  postProject: PostProjectRequestSchema
} as const;


export const zodGuard = (requestName: RequestName, req: Request) => {
  const parsedDto = dtoSchemaMap[requestName].safeParse(req.body);

  if (!parsedDto.success) {
    throw new InvalidRequestDataError();
  }

  req.body = parsedDto.data;
}
