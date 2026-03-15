import type { LoginRequest } from "@pkg/shared";
import { apiClient } from "../../../lib";
import type { ApiResult } from "../../../lib/types";
import type { LoginResult } from "../types/index";

export const login = async (body: LoginRequest): Promise<LoginResult> => {
  const response: ApiResult = await apiClient({
    path: "/api/auth/login",
    method: "POST",
    body: body
  });

  if (!response.ok && response.status !== 200) {
    console.error(response.error);
    return false;
  }

  return true;
}
