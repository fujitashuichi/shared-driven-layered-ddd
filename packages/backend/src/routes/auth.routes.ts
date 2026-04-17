import { Router } from "express"
import { createUser, session } from "../controller/auth.controller.js";
import { requestValidator } from "../middleware/index.js";


export const createAuthRouter = () => {
  const router = Router();

  router.get("/session", session);
  router.post("/register",
    requestValidator("register"),
    createUser
  );

  return router;
}
