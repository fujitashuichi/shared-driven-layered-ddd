export type RegisterResult =
  | { ok: false, errorType: "AlreadyRegistered" | "GetTokenFailed" | "UnknownError" }
  | { ok: true }

export type LoginResult = boolean;

export type LogoutResult = boolean;
