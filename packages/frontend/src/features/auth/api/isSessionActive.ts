import { SessionResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"

export const isSessionActive = async (): Promise<boolean> => {
  const response = await apiClient({
    path: "/api/auth/session",
    method: "GET",
    body: undefined
  });

  if (!response.ok && response.status !== 200) {
    console.info("Now you are not logged in.");
    return false;
  }

  const parsedBody = SessionResponseSchema.safeParse(response.body);
  if (!parsedBody.success) {
    console.error(parsedBody.error.message);
    return false;
  }

  return true;
}
