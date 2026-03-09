import type { AuthFetchPath, ProjectFetchPath, SessionFetchPath, UserFetchPath } from "@pkg/shared";
import type { ApiResult } from "./types";

type Props = {
  path: AuthFetchPath | ProjectFetchPath | SessionFetchPath | UserFetchPath,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: object
};

export const apiClient = async ({ path, method, body }: Props): Promise<ApiResult> => {
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const bodyMap = {
      GET: undefined,
      POST: JSON.stringify(body),
      PUT: JSON.stringify(body),
      DELETE: undefined
    } as const;

    const response = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: bodyMap[method]
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        body: response.body,
        error: new Error(response.statusText)
      }
    }

    return {
      ok: true,
      status: response.status,
      body: response.body
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        ok: false,
        status: 500,
        body: { message: e.message },
        error: e
      }
    }

    return {
      ok: false,
      status: 500,
      body: { message: "unknown error: fetch failed" },
      error: new Error("unknown error: fetch failed")
    }
  }
}
