import { ExpressAuth } from "@auth/express";
import { Router } from "express"

export const createAuthRouter_v2 = () => {
  const router = Router();

  router.use("/api/v2/auth/*", ExpressAuth({ providers: [] }))

  return router;
}
