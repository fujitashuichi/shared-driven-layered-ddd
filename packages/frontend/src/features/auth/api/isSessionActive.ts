import { SessionResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"

export const isSessionActive = async (): Promise<boolean> => {
  const response = await apiClient({
    path: "/api/session",
    method: "GET",
    body: {}
  });

  if (!response.ok) {
    console.info("Now you are not logged in.");
    return false;
  }

  const parsedBody = SessionResponseSchema.safeParse(response.body);
  if (!parsedBody.success) {
    console.error("server error:", parsedBody.error.message);
    return false;
  }

  return true;
}
