import type { AuthFetchPath, ProjectFetchPath, ResponseErrorName, ResponseJson, SessionFetchPath, UserFetchPath } from "@pkg/shared";
import type { ApiResult } from "./types";

type Props = {
  path: AuthFetchPath | ProjectFetchPath | SessionFetchPath | UserFetchPath,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body: object | undefined
};

class FetchError extends Error {
  status: number;
  data: unknown;
  errorName: ResponseErrorName | "UnknownError";

  constructor(
    message: string,
    status: number = 500,
    data: unknown = undefined,
    errorName: ResponseErrorName | "UnknownError"
  ) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.data = data;
    this.errorName = errorName;
  }
}

export const apiClient = async ({ path, method, body }: Props): Promise<ApiResult> => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const bodyMap = {
      GET: undefined,
      POST: JSON.stringify(body),
      PUT: JSON.stringify(body),
      PATCH: JSON.stringify(body),
      DELETE: undefined
    } as const;

    const response = await fetch(`${API_URL}${path}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: bodyMap[method]
    });

    const json: ResponseJson<unknown> = await response.json();

    if (!response.ok) {
      throw new FetchError(
        `fetch responses "not ok" with status ${response.status}`,
        response.status,
        json,
        json.success ? "UnknownError" : json.errorName
      );
    }

    if (!json.success) {
      throw new FetchError(
        json.message ?? response.statusText,
        response.status,
        json,
        json.errorName
      );
    }

    return {
      ok: true,
      status: response.status,
      body: json.data
    }
  } catch (e: unknown) {

    if (e instanceof FetchError) {
      return {
        ok: false,
        status: e.status,
        body: e.data,
        errorName: e.errorName,
        error: e
      }
    }

    if (e instanceof Error) {
      return {
        ok: false,
        status: 500,
        body: { message: e.message },
        errorName: "UnknownError",
        error: e
      }
    }

    return {
      ok: false,
      status: 500,
      body: { message: "unknown error: fetch failed" },
      errorName: "UnknownError",
      error: new Error("unknown error: fetch failed")
    }
  }
}
