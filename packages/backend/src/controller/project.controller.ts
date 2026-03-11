import { Database } from "sqlite3";
import { ProjectService } from "../service/index.js";
import { PostProjectRequest } from "@pkg/shared";
import { Request, Response } from "express";


export const createProject = async (req: Request, res: Response, db: Database) => {
  const dto: PostProjectRequest = req.body;
  const service = new ProjectService(db);

  const postResult = await service.saveProject(dto, res.locals.userId);

  return res.status(201).send({
    success: true,
    project: postResult
  });
}

export const getProjects = async (_: Request, res: Response, db: Database) => {
  const userId = res.locals.userId;
  const service = new ProjectService(db);

  const result = await service.findByUserId(userId);

  return res.status(200).send({
    success: true,
    projects: result
  });
}
