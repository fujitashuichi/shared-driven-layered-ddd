import type { PostProjectRequest } from "@pkg/shared";
import { apiClient } from "../../../lib"
import type { Project } from "@pkg/shared";
import type { UpdateProjectResult } from "../types";

export const updateProject = async (project: PostProjectRequest, id: Project["id"]): Promise<UpdateProjectResult> => {
  const response = await apiClient({
    path: `/api/projects/${id}`,
    method: "PATCH",
    body: project
  });

  if (!response.ok) {
    return {
      success: false,
      errorType: ""
    }
  }
}