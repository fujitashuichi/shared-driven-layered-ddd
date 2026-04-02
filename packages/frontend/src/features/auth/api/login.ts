import type { LoginRequest } from "@pkg/shared";
import { apiClient } from "../../../lib";
import type { ApiResult } from "../../../lib/types";
import type { LoginResult } from "./types/index";

export const login = async (body: LoginRequest): Promise<LoginResult> => {
  const response: ApiResult = await apiClient({
    path: "/api/auth/login",
    method: "POST",
    body: body
  });

  if (!response.ok) {
    console.error(response.error);
    if (response.errorName === "UserUndefinedError") {
      return {
        ok: false,
        errorType: "UnRegistered"
      }
    };
    return {
      ok: false,
      errorType: "Unknown"
    };
  }

  console.info("Now logged in.");
  return { ok: true };
}
