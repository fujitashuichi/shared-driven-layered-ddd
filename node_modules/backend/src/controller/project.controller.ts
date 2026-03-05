import { Database } from "sqlite3";
import { ProjectService } from "../service/project.service.js";
import { PostProjectRequest } from "@pkg/shared";
import { Request, Response } from "express";


export const createProject = async (req: Request, res: Response, db: Database) => {
  const dto: PostProjectRequest = req.body;
  const service = new ProjectService(db);

  const postResult = await service.saveProject(dto);

  return res.status(201).send({
    success: true,
    project: postResult
  });
}
