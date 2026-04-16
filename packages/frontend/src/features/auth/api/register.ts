import { RegisterResponseSchema, type RegisterRequest } from "@pkg/shared";
import { login } from "./login";
import type { ApiResult } from "../../../lib/types";
import { apiClient } from "../../../lib";
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
        ok: false,
        errorType: "AlreadyRegistered"
      }
    }

    throw new Error("register failed with fetch Error");
  }

  const data = await response.body;
  const parsedData = RegisterResponseSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      ok: false,
      errorType: "GetTokenFailed"
    }
  }

  const loginResult = await login({
    email: body.email,
    password: body.password
  });
  if (loginResult.ok === false) {
    return {
      ok: false,
      errorType: "Unknown"
    }
  }

  return { ok: true }
}
