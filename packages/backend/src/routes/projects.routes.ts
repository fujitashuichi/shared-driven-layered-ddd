import { Router } from "express";
import { authorize, requestValidator } from "../middleware/index.js";
import { createProject, getProjects } from "../controller/index.js";
import { Database } from "sqlite3";


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

  router.patch("/:id", (_, res) => {
    res.status(501).json();
  });

  router.delete("/:id", (_, res) => {
    res.status(501).json();
  });

  return router;
}
