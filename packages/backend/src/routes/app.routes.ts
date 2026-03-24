import { Request, Response, Router } from "express";
import { createApiRouter } from "./api.routes.js";


export const createAppRouter = () => {
  const router = Router();

  const apiRouter = createApiRouter();

  router.use("/api", apiRouter);

  router.use("/", (_: Request, res: Response) => {
    return res.status(200).json("Server running...");
  });

  return router;
}
