import { Router } from "express";
import { requestValidator } from "../middleware/index.js";
import { createProject } from "../controller/index.js";
import { Database } from "sqlite3";


export const createProjectRouter = (db: Database) => {
  const router = Router();

  router.post("/",
    (req, res, next) => requestValidator(req, res, next, "postProject"),
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
