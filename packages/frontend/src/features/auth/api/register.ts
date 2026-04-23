import { RegisterResponseSchema, type RegisterRequest } from "@pkg/shared";
import { apiClient } from "../../../lib/api-client";
import type { ApiResult } from "../../../lib/types";
import type { RegisterResult } from "./types";

export const register = async (body: RegisterRequest): Promise<RegisterResult> => {
  const response: ApiResult = await apiClient({
    path: "/api/auth/register",
    method: "POST",
    body: body
  });


  if (!response.ok) {
    console.error(response.error);
    if (response.status === 409 || response.error.name === "AlreadyRegisteredError") {
      return {
        success: false,
        errorType: "AlreadyRegistered"
      }
    }

    throw new Error("register failed with fetch Error");
  }

  const data = await response.body;
  const parsedData = RegisterResponseSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      errorType: "GetTokenFailed"
    }
  }

  return { success: true }
}
