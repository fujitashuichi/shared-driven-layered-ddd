import type { LoginRequest } from "@pkg/shared"
import { signIn } from "next-auth/react"
import type { LoginResult } from "./types"


export const login = async ({ email, password }: LoginRequest): Promise<LoginResult> => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });


  if (!result) {
    return {
      ok: false,
      errorType: "Unknown"
    }
  }


  if (!result.ok) {
    if (result.status === 401) {
      return {
        ok: false,
        errorType: "UnRegistered"
      }
    }

    if (result.status === 403) {
      console.error(`This error might be caused by CSRF.\n  errorMessage: ${result.error ?? "No error message found"}`);
      return {
        ok: false,
        errorType: "Unknown"
      }
    }

    return {
      ok: false,
      errorType: "Unknown"
    }
  }


  console.info("You are logged in.");
  return {
    ok: true
  }
}
