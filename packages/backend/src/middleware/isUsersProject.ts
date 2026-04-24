import { Project } from "@pkg/shared";
import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../service/index.js";
import { ProjectUndefinedError } from "../error/index.js";

export const isUsersProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new ProjectService()

    const userId = res.locals.userId;
    if (!userId) return next(new Error("先にauthMiddlewareを設定する必要があります"));

    const projectId = Number(req.params.id);
    if (!projectId) return next(new Error("isUsersProjectは req.param.id を要します"));

    const usersProjects: Project[] = await service.findByUserId(userId);
    const requiredProject: Project | null = await service.findById(projectId);

    if (requiredProject === null) return next(new ProjectUndefinedError());

    const isUsersProject = usersProjects.some(p => p.id === projectId);
    if (!isUsersProject) return next(new ProjectUndefinedError());

    next();
  } catch(err) {
    next(err);
  }
}
