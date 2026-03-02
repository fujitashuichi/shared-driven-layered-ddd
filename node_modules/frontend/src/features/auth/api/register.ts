import { RegisterResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib/api-client";
import type { UserRegisterBodyType } from "../types/types.data";
import type { RegisterResult } from "../types/types.result";
import type { ApiResult } from "../../../lib/types";

export const registerUser = async (body: UserRegisterBodyType): Promise<RegisterResult> => {
  const response: ApiResult = await apiClient({
    path: "/api/auth/register",
    method: "POST",
    body: body
  });

  if (!response.ok) {
    console.error("register failed by response Error");
    return {
      ok: false,
      error: response.error
    }
  }

  const data = await response.body;
  const parsedData = RegisterResponseSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      ok: false,
      error: new Error("invalid json: failed to get Token")
    }
  }

  return { ok: true }
}
