import { LoginRequestSchema, PostProjectRequestSchema, RegisterRequestSchema } from "@pkg/shared";
import { Request } from "express";
import { GetProjectsRequestSchema } from "../../../../shared/dist/types/project/types.dto.js";
import { InvalidRequestDataError } from "../../error/SecurityError.js";

export type RequestName = "register" | "login" | "postProject" | "getProjects";

const dtoSchemaMap = {
  register: RegisterRequestSchema,
  login: LoginRequestSchema,
  postProject: PostProjectRequestSchema,
  getProjects: GetProjectsRequestSchema
} as const;


export const zodGuard = (requestName: RequestName, req: Request) => {
  const parsedDto = dtoSchemaMap[requestName].safeParse(req.body);

  if (!parsedDto.success) {
    throw new InvalidRequestDataError();
  }

  req.body = parsedDto.data;
}
