import { IsLoggedInResponseSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"

export const isLoggedIn = async (): Promise<boolean> => {
  const response = await apiClient({
    path: "/api/auth/is-logged-in",
    method: "GET",
    body: {}
  });

  if (!response.ok) {
    console.info("Now you are not logged in.");
    return false;
  }

  const parsedBody = IsLoggedInResponseSchema.safeParse(response.body);
  if (!parsedBody.success) {
    console.error("Zod Error: invalid response.", parsedBody.error.message);
    return false;
  }

  return true;
}
