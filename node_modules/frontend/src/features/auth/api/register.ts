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
    console.error(response.error);
    if (response.status === 409 || response.error.name === "AlreadyRegisteredError") {
      return {
        ok: false,
        errorType: "AlreadyRegistered"
      }
    }
    return {
      ok: false,
      errorType: "UnknownError"
    };
  }

  const data = await response.body;
  const parsedData = RegisterResponseSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      ok: false,
      errorType: "GetTokenFailed"
    }
  }

  return { ok: true }
}
