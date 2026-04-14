import { ExpressAuth } from "@auth/express";
import { Router } from "express"

export const createAuthRouter_v2 = () => {
  const router = Router();

  router.use(ExpressAuth({ providers: [] }))

  return router;
}
