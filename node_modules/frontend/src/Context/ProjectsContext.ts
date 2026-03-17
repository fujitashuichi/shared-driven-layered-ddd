import type { Project } from "@pkg/shared";
import React, { createContext, useContext, type SetStateAction } from "react";

type ProjectsData = {
  projects: Project[],
  setProjects: React.Dispatch<SetStateAction<Project[]>>
}
type GetProjects = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: string | null,
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
  update: (e: React.SubmitEvent<HTMLFormElement>, id: Project["id"]) => Promise<void>
};
type Delete = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: string | null,
  delete: (id: Project["id"]) => Promise<void>
};

export type ProjectCtxType = {
  projectsData: ProjectsData, getProjects: GetProjects, create: Create, update: Update, delete: Delete
};


export const ProjectCtx = createContext<ProjectCtxType | null>(null);

export const useProject = () => {
  const ctx = useContext(ProjectCtx);
  if (ctx === null) throw new Error("Context must be used within Provider");
  return ctx;
}
