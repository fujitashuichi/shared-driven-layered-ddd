import { SessionResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"
import type { SessionResult } from "./types";

export const isSessionActive = async (): Promise<SessionResult> => {
  const response = await apiClient({
    path: "/api/auth/session",
    method: "GET",
    body: undefined
  });

  if (!response.ok) {
    if (response.status === 401 || response.errorName === "UnAuthorizedError") {
      console.info("You are not logged in.");
      return { success: false };
    }

    console.log("session check failed.")
    return { success: false };
  }

  const parsed = SessionResponseSchema.safeParse(response.body);
  if (!parsed.success) {
    console.info("You are not logged in.");
    return { success: false };
  }

  console.info("Now logged in.");
  return { success: true };
}
