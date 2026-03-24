import { Router } from "express";
import { createAuthRouter } from "./auth.routes.js";
import { createProjectRouter } from "./projects.routes.js";


export const createAppRouter = () => {
  const router = Router();

  const authRouter = createAuthRouter();
  const projectRouter = createProjectRouter();

  router.use("/auth", authRouter);
  router.use("/projects", projectRouter);
  router.use("/", (_, res) => res.status(400).json("Server Running..."));

  return router;
}
