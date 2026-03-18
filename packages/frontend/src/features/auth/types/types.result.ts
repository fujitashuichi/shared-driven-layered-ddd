import type { User } from "@pkg/shared";

export type RegisterResult =
  | { ok: false, errorType: "AlreadyRegistered" | "GetTokenFailed" | "UnknownError" }
  | { ok: true }

export type LoginResult = boolean;

export type LogoutResult = boolean;

export type GetUserDataResult =
  | { ok: false, errorType: "UnAuthorized" | "InvalidData" | "UnknownError" }
  | { ok: true, data: User }
