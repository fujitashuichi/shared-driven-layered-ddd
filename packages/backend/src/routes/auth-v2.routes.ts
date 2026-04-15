import { ExpressAuth } from "@auth/express";
import { Router } from "express"
import { authConfig } from "../middleware/authorize_v2.js";

export const createAuthRouter_v2 = () => {
  const router = Router();

  router.use("/", ExpressAuth(authConfig))

  return router;
}
