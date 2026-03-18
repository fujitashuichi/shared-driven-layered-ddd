import { LoginRequestSchema, PostProjectRequestSchema, RegisterRequestSchema } from "@pkg/shared";
import { Request } from "express";
import { InvalidRequestDataError } from "../../error/SecurityError.js";
import z from "zod";

export type RequestName = "register" | "login" | "logout" | "me" | "postProject";

const dtoSchemaMap = {
  register: RegisterRequestSchema,
  login: LoginRequestSchema,
  logout: z.object({}).or(z.undefined()),
  me: z.object({}).or(z.undefined()),
  postProject: PostProjectRequestSchema
} as const;


export const zodGuard = (requestName: RequestName, req: Request) => {
  const parsedDto = dtoSchemaMap[requestName].safeParse(req.body);

  if (!parsedDto.success) {
    throw new InvalidRequestDataError();
  }

  req.body = parsedDto.data;
}
