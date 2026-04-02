import type { User } from "@pkg/shared";

export type RegisterResult =
  | { ok: false, errorType: "AlreadyRegistered" | "GetTokenFailed" }
  | { ok: true }

export type LoginResult =
  | { ok: false, errorType: "UnRegistered" | "Unknown" }
  | { ok: true }

export type LogoutResult = boolean;

export type GetUserDataResult =
  | { ok: false, errorType: "UnAuthorized" | "InvalidData" }
  | { ok: true, data: User }
