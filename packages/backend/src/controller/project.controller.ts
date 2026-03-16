import { Database } from "sqlite3";
import { ProjectService } from "../service/index.js";
import { GetProjectsResponse, PatchProjectRequest, PatchProjectResponse, PostProjectRequest, PostProjectResponse, Project, ResponseJson } from "@pkg/shared";
import { Request, Response } from "express";


export const createProject = (db: Database) => {
  return async (req: Request, res: Response) => {
    const dto: PostProjectRequest = req.body;
    const service = new ProjectService(db);

    const postResult = await service.saveProject(dto, res.locals.userId);
    const json: ResponseJson<PostProjectResponse> = {
      success: true,
      data: postResult
    }

    return res.status(201).json(json);
  }
}

export const getProjects = (db: Database) => {
  return async (_: Request, res: Response) => {
    const userId = res.locals.userId;
    const service = new ProjectService(db);

    const result: Project[] = await service.findByUserId(userId);
    const json: ResponseJson<GetProjectsResponse> = {
      success: true,
      data: result
    }

    return res.status(200).json(json);
  }
}

export const updateProject = (db: Database) => {
  return async (req: Request, res: Response) => {
    const service = new ProjectService(db);

    const dto: PatchProjectRequest = req.body;
    const id = Number(req.params.id);

    const result: Project = await service.updateProject(dto, id);
    const json: ResponseJson<PatchProjectResponse> = {
      success: true,
      data: result
    }

    return res.status(201).json(json);
  }
}

export const deleteProject = (db: Database) => {
  return async (req: Request, res: Response) => {
    const service = new ProjectService(db);

    const id = Number(req.params.id);

    await service.deleteProject(id);
    const json: ResponseJson<null> = {
      success: true,
      data: null,
      message: "Project successfully deleted"
    }

    res.status(201).json(json);
  }
}
