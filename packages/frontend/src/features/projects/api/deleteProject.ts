import { DeleteProjectResponseSchema, type Project } from "@pkg/shared"
import { apiClient } from "../../../lib"
import type { DeleteProjectResult } from "./types";

export const deleteProject = async (id: Project["id"]): Promise<DeleteProjectResult> => {
  const response = await apiClient({
    path: `/api/projects/${id}`,
    method: "DELETE",
    body: undefined
  });


  if (!response.ok) {
    if (response.status === 401 || response.errorName === "UnAuthorizedError") {
      return {
        success: false,
        errorType: "UnAuthorized"
      }
    }

    if (response.errorName === "UserUndefinedError") {
      return {
        success: false,
        errorType: "UserUndefined"
      }
    }

    if (response.errorName === "ProjectUndefinedError") {
      return {
        success: false,
        errorType: "ProjectUndefined"
      }
    }

    return {
      success: false,
      errorType: "Unknown"
    }
  }

  const parsed = DeleteProjectResponseSchema.safeParse(response.body);
  if (!parsed.success) {
    return {
      success: false,
      errorType: "InvalidData"
    }
  }

  return {
    success: true,
    value: undefined
  }
}
