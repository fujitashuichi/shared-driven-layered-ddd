import { Router } from "express";
import { authorize, requestValidator } from "../middleware/index.js";
import { createProject } from "../controller/index.js";
import { Database } from "sqlite3";


export const createProjectRouter = (db: Database) => {
  const router = Router();

  router.post("/",
    requestValidator("postProject"),
    authorize(db),
    (req, res) => createProject(req, res, db)
  );

  router.patch("/:id", (_, res) => {
    res.status(501).send();
  });

  router.delete("/:id", (_, res) => {
    res.status(501).send();
  });

  return router;
}
