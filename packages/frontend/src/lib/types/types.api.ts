import type { ResponseErrorName } from "@pkg/shared"

export type ApiResult =
  | {
    ok: false,
    status: number,
    body: unknown,
    errorName: ResponseErrorName | "UnknownError",
    error: Error
  }
  | {
    ok: true,
    status: number,
    body: unknown
  }
