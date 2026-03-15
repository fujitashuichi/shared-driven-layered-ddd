import { ProjectSchema } from "@pkg/shared";
import { apiClient } from "../../../lib"
import type { GetProjectsResult } from "../types";

export const getProjects = async (): Promise<GetProjectsResult> => {
  const response = await apiClient({
    path: "/api/projects",
    method: "GET",
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
      errorType: "UnknownError"
    }
  }

  const parsed = ProjectSchema.array().safeParse(response.body);
  if (!parsed.success) {
    console.error(parsed.error);
    return {
      success: false,
      errorType: "InvalidDataError"
    }
  }

  return {
    success: true,
    value: parsed.data
  }
}
