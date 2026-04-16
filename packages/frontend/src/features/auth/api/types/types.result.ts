import type { User } from "@pkg/shared";

export type RegisterResult =
  | { ok: false, errorType: "AlreadyRegistered" | "GetTokenFailed" | "Unknown" }
  | { ok: true }

export type LoginResult =
  | { ok: false, errorType: "UnRegistered" | "Unknown" }
  | { ok: true }

export type LogoutResult =
  | { ok: false }
  | { ok: true }

export type GetUserDataResult =
  | { ok: false, errorType: "UnAuthorized" | "InvalidData" }
  | { ok: true, data: User }
