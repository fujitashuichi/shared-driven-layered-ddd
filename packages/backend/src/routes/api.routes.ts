import { Router } from "express";
import { createAuthRouter } from "./auth.routes.js";
import { createProjectRouter } from "./projects.routes.js";


export const createApiRouter = () => {
  const router = Router();

  const authRouter = createAuthRouter();
  const projectRouter = createProjectRouter();

  router.use("/auth", authRouter);
  router.use("/projects", projectRouter);

  return router;
}