import type { Project } from "@pkg/shared";

type ServiceResult<T, P> =
  | { success: false, errorType: T }
  | { success: true, value: P }

export type CreateProjectResult = ServiceResult<
  "ProjectAlreadyExists" | "UnAuthorized" | "InvalidData" | "Unknown",
  Project
>

export type GetProjectsResult = ServiceResult<
  "InvalidDataError" | "UnAuthorized" | "Unknown",
  Project[]
>

export type UpdateProjectResult = ServiceResult<
  "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData" | "Unknown",
  Project
>

export type DeleteProjectResult = ServiceResult<
  "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData" | "Unknown",
  undefined
>
