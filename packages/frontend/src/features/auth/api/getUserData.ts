import { SessionResponseSchema, type User } from "@pkg/shared";
import { apiClient } from "../../../lib"
import type { GetUserDataResult } from "./types";

export const getUserData = async (): Promise<GetUserDataResult> => {
  const response = await apiClient({
    path: "/api/auth/session",
    method: "GET",
    body: undefined
  });

  if (!response.ok) {
    if (response.status === 401) {
      return {
        ok: false,
        errorType: "UnAuthorized"
      }
    }

    return {
      ok: false,
      errorType: "Unknown"
    }
  }

  const parsed = SessionResponseSchema.safeParse(response.body);
  if (!parsed.success) {
    return {
      ok: false,
      errorType: "InvalidData"
    }
  }

  const data: User = {
    ...parsed.data,
    createdAt: new Date(parsed.data.createdAt)
  };

  return {
    ok: true,
    data
  }
}
