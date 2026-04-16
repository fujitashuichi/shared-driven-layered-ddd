import { Router } from "express"
import { ExpressAuth } from "@auth/express";
import { createUser, session } from "../controller/auth.controller.js";
import { authConfig } from "../config/authConfig.js";


export const createAuthRouter = () => {
  const router = Router();

  router.get("/session", session);
  router.post("/register", createUser);
  router.use(ExpressAuth(authConfig));

  return router;
}
