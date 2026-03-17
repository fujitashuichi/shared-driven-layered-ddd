import { useState } from "react";
import type { ProjectCtxType } from "../../../Context"

type Result = ProjectCtxType["projectsData"];

export const useProjectsData = (): Result => {
  const [projects, setProjects] = useState<Result["projects"]>([]);

  return { projects, setProjects };
}
