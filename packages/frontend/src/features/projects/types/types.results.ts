import type { Project } from "@pkg/shared";

type ServiceResult<T, P> =
  | { success: false, errorType: T }
  | { success: true, value: P }

export type CreateProjectResult = ServiceResult<
  "ProjectAlreadyExists" | "UnAuthorized" | "InvalidData" | "UnknownError",
  Project
>

export type GetProjectsResult = ServiceResult<
  "InvalidDataError" | "UnAuthorized" | "UnknownError",
  Project[]
>

export type UpdateProjectResult = ServiceResult<
  "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData" | "UnknownError",
  Project
>

export type DeleteProjectResult = ServiceResult<
  "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData" | "UnknownError",
  undefined
>
