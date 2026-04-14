import type { ResponseErrorName } from "./types.responseErrorName.js"

export type AuthFetchPath =
  | "/api/auth/register"
  | "/api/auth/login"
  | "/api/auth/logout"
  | "/api/auth/me"
  | "/api/auth/v2/register"
  | "/api/auth/v2/login"
  | "/api/auth/v2/logout"
  | "/api/auth/v2/me"

export type SessionFetchPath =
  | "/api/auth/session"

export type ProjectFetchPath =
  | "/api/projects"
  | `/api/projects/${number}`


export type ResponseJson<T extends unknown> =
  | {
    success: false,
    errorName: ResponseErrorName,
    message?: string,
  }
  | {
    success: true,
    data: T,
    message?: string
  }
