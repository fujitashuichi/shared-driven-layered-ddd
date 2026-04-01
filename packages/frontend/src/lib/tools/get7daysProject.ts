import type { Project } from "@pkg/shared"

export const get7daysProjects = (projects: Project[], time: Date) => {
  const sevenDaysAgo = time.getTime() - (7 * 24 * 60 * 60 * 1000);
  return projects.filter(item => new Date(item.updatedAt).getTime() >= sevenDaysAgo);
}
