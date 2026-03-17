import type { PostProjectRequest, Project } from "@pkg/shared";
import { createContext, useContext } from "react";

type GetProjects = {
  status: "InvalidDataError" | "UnAuthorized" | "UnknownError",
  errorMassage: string | null,
  get: () => Promise<void>
}
type Create = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: "ProjectAlreadyExists" | "UnAuthorized" | "InvalidData" | "UnknownError",
  create: (e: React.SubmitEvent<HTMLFormElement>) => Promise<Project>
};
type Update = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData" | "UnknownError",
  update: (project: PostProjectRequest) => Promise<Project>
};
type Delete = {
  status: "idle" | "loading" | "error" | "success",
  errorMessage: "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData" | "UnknownError",
  delete: () => Promise<undefined>
};

export type ProjectCtxType = {
  getProjects: GetProjects, create: Create, update: Update, delete: Delete
};


export const ProjectCtx = createContext<ProjectCtxType | null>(null);

export const useProject = () => {
  const ctx = useContext(ProjectCtx);
  if (ctx === null) throw new Error("Context must be used within Provider");
}
