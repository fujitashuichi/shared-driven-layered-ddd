import { ProjectService } from "../service/index.js";
import { DeleteProjectResponse, GetProjectsResponse, PatchProjectRequest, PatchProjectResponse, PostProjectRequest, PostProjectResponse, Project, ResponseJson } from "@pkg/shared";
import { Request, Response } from "express";
import { ProjectUndefinedError } from "../error/ProjectError.js";


export const createProject = async (req: Request, res: Response) => {
  const dto: PostProjectRequest = req.body;
  const service = new ProjectService();

  const result = await service.saveProject(dto, res.locals.userId);
  if (!result) throw new ProjectUndefinedError();

  const json: ResponseJson<PostProjectResponse> = {
    success: true,
    data: result
  }

  return res.status(201).json(json);
}

export const getProjects = async (_: Request, res: Response) => {
  const userId = res.locals.userId;
  const service = new ProjectService();

  const result: Project[] = await service.findByUserId(userId);
  const json: ResponseJson<GetProjectsResponse> = {
    success: true,
    data: result
  }

  return res.status(200).json(json);
}

export const updateProject = async (req: Request, res: Response) => {
  const service = new ProjectService();

  const dto: PatchProjectRequest = req.body;
  const id = Number(req.params.id);

  const result: Project = await service.updateProject(dto, id);
  const json: ResponseJson<PatchProjectResponse> = {
    success: true,
    data: result
  }

  return res.status(201).json(json);
}

export const deleteProject = async (req: Request, res: Response) => {
  const service = new ProjectService();

  const id = Number(req.params.id);

  await service.deleteProject(id);
  const json: ResponseJson<DeleteProjectResponse> = {
    success: true,
    data: {},
    message: "Project successfully deleted"
  }

  res.status(200).json(json);
}
