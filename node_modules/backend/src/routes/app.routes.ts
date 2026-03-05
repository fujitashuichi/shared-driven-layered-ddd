import { Router } from "express";
import { createAuthRouter } from "./auth.routes.js";
import { createProjectRouter } from "./projects.routes.js";
import { Database } from "sqlite3";


export const createAppRouter = (db: Database) => {
  const router = Router();

  const authRouter = createAuthRouter(db);
  const projectRouter = createProjectRouter(db);

  router.use("/auth", authRouter);
  router.use("/projects", projectRouter);

  return router;
}
