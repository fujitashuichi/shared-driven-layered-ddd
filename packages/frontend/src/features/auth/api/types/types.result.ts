import type { User } from "@pkg/shared";

export type RegisterResult =
  | { success: false, errorType: "AlreadyRegistered" | "GetTokenFailed" | "Unknown" }
  | { success: true }

export type LoginResult =
  | { success: false, errorType: "UnRegistered" | "Unknown" }
  | { success: true }

export type LogoutResult =
  | { success: false }
  | { success: true };

export type GetUserDataResult =
  | { success: false, errorType: "UnAuthorized" | "InvalidData" | "Unknown" }
  | { success: true, data: User }

export type SessionResult =
  | { success: false }
  | { success: true }
