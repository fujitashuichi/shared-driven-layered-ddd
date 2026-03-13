import { Database } from "sqlite3";
import { ProjectService } from "../service/index.js";
import { PostProjectRequest, Project } from "@pkg/shared";
import { Request, Response } from "express";


export const createProject = (db: Database) => {
  return async (req: Request, res: Response) => {
    const dto: PostProjectRequest = req.body;
    const service = new ProjectService(db);

    const postResult = await service.saveProject(dto, res.locals.userId);

    return res.status(201).json(postResult);
  }
}

export const getProjects = (db: Database) => {
  return async (_: Request, res: Response) => {
    const userId = res.locals.userId;
    const service = new ProjectService(db);

    const result: Project[] = await service.findByUserId(userId);

    return res.status(200).json(result);
  }
}
