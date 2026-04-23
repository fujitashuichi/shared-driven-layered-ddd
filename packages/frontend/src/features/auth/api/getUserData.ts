import { MeResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"
import type { GetUserDataResult } from "./types";

export const getUserData = async (): Promise<GetUserDataResult> => {
  const response = await apiClient({
    path: "/api/auth/me",
    method: "POST",
    body: undefined
  });

  if (!response.ok) {
    if (response.status === 401 || response.errorName === "UnAuthorizedError") {
      return {
        success: false,
        errorType: "UnAuthorized"
      }
    }

    return {
      success: false,
      errorType: "Unknown"
    }
  }

  const parsed = MeResponseSchema.safeParse(response.body);
  if (!parsed.success) {
    return {
      success: false,
      errorType: "InvalidData"
    }
  }



  return {
    success: true,
    data: parsed.data
  }
}
