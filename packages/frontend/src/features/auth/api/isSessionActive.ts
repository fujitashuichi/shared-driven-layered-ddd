import { SessionResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"
import type { SessionResult } from "./types";

export const isSessionActive = async (): Promise<SessionResult> => {
  const response = await apiClient({
    path: "/api/auth/session",
    method: "GET",
    body: undefined
  });

  if (response.status === 401) {
    console.info("You are not logged in.");
    return { success: false };
  }

  const parsedBody = SessionResponseSchema.safeParse(response.body);
  if (!parsedBody.success) {
    console.error(parsedBody.error.message);
    return { success: false };
  }

  console.info("Now logged in.");
  return { success: true };
}
