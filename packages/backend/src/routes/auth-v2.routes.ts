import { Router } from "express"
import { session_v2 } from "../auth-js/auth-v2.controller.js";

export const createAuthRouter_v2 = () => {
  const router = Router();

  router.get("/session", session_v2)

  return router;
}
