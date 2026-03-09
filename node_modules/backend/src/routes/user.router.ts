import { Request, Response, Router } from "express";
import { Database } from "sqlite3";
import { requestValidator } from "../middleware/request.guard.js";
import { getProjects } from "../controller/project.controller.js";


export const createUserRouter = (req: Request, res: Response, db: Database) => {
  const router = Router();

  router.get("/:userId/projects",
    (req, res, next) => requestValidator(req, res, next, "getProjects"),
    (req, res) => getProjects(req, res, db)
  );
}