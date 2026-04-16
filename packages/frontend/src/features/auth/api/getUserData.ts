import { MeResponseSchema } from "@pkg/shared";
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

    throw new Error("getUserData failed with fetch Error");
  }

  const parsed = MeResponseSchema.safeParse(response.body);
  if (!parsed.success) {
    return {
      ok: false,
      errorType: "InvalidData"
    }
  }

  return {
    ok: true,
    data: parsed.data
  }
}
