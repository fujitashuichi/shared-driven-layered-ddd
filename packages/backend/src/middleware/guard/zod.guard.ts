import { LoginRequestSchema, PatchProjectRequestSchema, PostProjectRequestSchema, RegisterRequestSchema } from "@pkg/shared";
import { Request } from "express";
import { InvalidRequestDataError } from "../../error/SecurityError.js";
import z from "zod";

export type RequestName =
  | "register" | "login" | "logout"
  | "postProject" | "patchProject";

const dtoSchemaMap = {
  register: RegisterRequestSchema,
  login: LoginRequestSchema,
  logout: z.object({}).or(z.undefined()),
  postProject: PostProjectRequestSchema,
  patchProject: PatchProjectRequestSchema
} as const;


export const zodGuard = (requestName: RequestName, req: Request) => {
  const parsedDto = dtoSchemaMap[requestName].safeParse(req.body);

  if (!parsedDto.success) {
    throw new InvalidRequestDataError();
  }

  req.body = parsedDto.data;
}
