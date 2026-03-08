import { Database } from "sqlite3";
import { ProjectService } from "../service/index.js";
import { PostProjectRequest } from "@pkg/shared";
import { Request, Response } from "express";
import { GetProjectsRequest } from "../../../shared/dist/types/project/index.js";


export const createProject = async (req: Request, res: Response, db: Database) => {
  const dto: PostProjectRequest = req.body;
  const service = new ProjectService(db);

  const postResult = await service.saveProject(dto);

  return res.status(201).send({
    success: true,
    project: postResult
  });
}

export const getProjects = async (req: Request, res: Response, db: Database) => {
  const dto: GetProjectsRequest = req.body;
  const service = new ProjectService(db);

  const result = await service.findByUserId(dto.userId);

  return res.status(200).send({
    success: true,
    projects: result
  });
}
