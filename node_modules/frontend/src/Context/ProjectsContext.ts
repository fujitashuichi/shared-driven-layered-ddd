import type { Project } from "@pkg/shared";
import type { PostProjectRequest } from "@pkg/shared";
import { createContext, useContext } from "react";

type GetProjects = {
  status: "idle" | "loading" | "error" | "success",
  errorMassage: string | null,
  projects: Project[],
  get: () => Promise<void>
}
type Create = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: string | null,
  create: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>
};
type Update = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: string | null,
  update: (project: PostProjectRequest) => Promise<void>
};
type Delete = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: string | null,
  delete: () => Promise<void>
};

export type ProjectCtxType = {
  getProjects: GetProjects, create: Create, update: Update, delete: Delete
};


export const ProjectCtx = createContext<ProjectCtxType | null>(null);

export const useProject = () => {
  const ctx = useContext(ProjectCtx);
  if (ctx === null) throw new Error("Context must be used within Provider");
}
