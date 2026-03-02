export type ApiResult =
  | {
    ok: false,
    status: number,
    body: unknown,
    error: Error
  }
  | {
    ok: true,
    status: number,
    body: unknown
  }
