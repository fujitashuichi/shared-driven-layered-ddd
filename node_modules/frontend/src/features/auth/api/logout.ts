import { apiClient } from "../../../lib"
import type { ApiResult } from "../../../lib/types";
import type { LogoutResult } from "../types";

export const logout = async (): Promise<LogoutResult> => {
  const response: ApiResult = await apiClient({
    path: "/api/auth/logout",
    method: "POST",
    body: {}
  });

  if (!response.ok) {
    console.error(response.error);
    return false;
  }

  return true;
}
