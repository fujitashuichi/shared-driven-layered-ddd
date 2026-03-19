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
    if (response.errorName === "UserUndefinedError") alert("そのemailは登録されていません");
    console.error(response.error);
    return false;
  }

  console.info("Now logged in.");
  return true;
}
