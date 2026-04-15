import { Router } from "express";
import { createAuthRouter } from "./auth.routes.js";
import { createProjectRouter } from "./projects.routes.js";
import { createAuthRouter_v2 } from "./auth-v2.routes.js";


export const createApiRouter = () => {
  const router = Router();

  const authRouter_v2 = createAuthRouter_v2();
  const authRouter = createAuthRouter();
  const projectRouter = createProjectRouter();

  router.use("/auth/v2", authRouter_v2);
  router.use("/auth", authRouter);
  router.use("/projects", projectRouter);

  return router;
}