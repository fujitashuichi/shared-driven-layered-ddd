import { ProjectSchema, type PostProjectRequest } from "@pkg/shared";
import { apiClient } from "../../../lib";
import type { CreateProjectResult } from "./types";

export const createProject = async (project: PostProjectRequest): Promise<CreateProjectResult> => {
  const response = await apiClient({
    path: "/api/projects",
    method: "POST",
    body: project
  });

  if (!response.ok) {
    if (response.status === 409 || response.errorName === "DuplicateProjectError") {
      return {
        success: false,
        errorType: "ProjectAlreadyExists"
      }
    }
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

  const parsed = ProjectSchema.safeParse(response.body);
  if (!parsed.success) {
    return {
      success: false,
      errorType: "InvalidData"
    }
  }

  return {
    success: true,
    value: parsed.data
  }
}
