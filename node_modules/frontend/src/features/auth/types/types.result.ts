export type RegisterResult =
  | { ok: false, error: Error }
  | { ok: true }

export type LoginResult =
  | { ok: false, error: Error }
  | { ok: true }
