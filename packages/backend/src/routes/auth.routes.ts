import { Router } from "express";
import { session, login, logout, register, me } from "../controller/index.js";
import { authorize, requestValidator } from "../middleware/index.js";


export const createAuthRouter = () => {
  const router = Router();

  router.post("/register",
    requestValidator("register"),
    register
  );

  router.get("/session",
    session
  );

  router.post("/login",
    requestValidator("login"),
    login
  );

  router.post("/logout",
    requestValidator("logout"),
    logout
  );

  router.post("/me",
    requestValidator("me"),
    authorize,
    me
  );

  return router;
}
