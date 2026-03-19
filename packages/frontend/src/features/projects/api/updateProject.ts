import { ProjectSchema, type PostProjectRequest } from "@pkg/shared";
import { apiClient } from "../../../lib"
import type { Project } from "@pkg/shared";
import type { UpdateProjectResult } from "./types";

export const updateProject = async (project: PostProjectRequest, id: Project["id"]): Promise<UpdateProjectResult> => {
  const response = await apiClient({
    path: `/api/projects/${id}`,
    method: "PATCH",
    body: project
  });

  if (!response.ok) {
    if (response.errorName === "UnAuthorizedError") {
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

    console.log("updateProjects failed with fetch Error");
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
