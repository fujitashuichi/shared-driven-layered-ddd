import { SessionResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"

export const isSessionActive = async (): Promise<boolean> => {
  const response = await apiClient({
    path: "/api/auth/v2/session",
    method: "GET",
    body: undefined
  });

  if (response.status === 401) {
    console.info("You are not logged in.");
    return false;
  }

  const parsedBody = SessionResponseSchema.safeParse(response.body);
  if (!parsedBody.success) {
    console.error(parsedBody.error.message);
    return false;
  }

  console.info("Now logged in.");
  return true;
}
