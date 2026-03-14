import { Router } from "express";
import { authorize, requestValidator } from "../middleware/index.js";
import { createProject, getProjects } from "../controller/index.js";
import { Database } from "sqlite3";
import { isUsersProject } from "../middleware/isUsersProject.js";


export const createProjectRouter = (db: Database) => {
  const router = Router();

  router.post("/",
    requestValidator("postProject"),
    authorize(db),
    createProject(db)
  );

  router.get("/",
    authorize(db),
    getProjects(db)
  );

  router.patch("/:id",
    authorize(db),
    isUsersProject(db)
  );

  router.delete("/:id", (_, res) => {
    res.status(501).json();
  });

  return router;
}
