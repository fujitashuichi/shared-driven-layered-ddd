import { Router } from "express";
import { Database } from "sqlite3";
import { session, login, logout, register, me } from "../controller/index.js";
import { requestValidator } from "../middleware/index.js";


export const createAuthRouter = (db: Database) => {
  const router = Router();

  router.post("/register",
    requestValidator("register"),
    register(db)
  );

  router.get("/session",
    session(db)
  );

  router.post("/login",
    requestValidator("login"),
    login(db)
  );

  router.post("/logout",
    requestValidator("logout"),
    logout
  );

  router.post("/me",
    requestValidator("me"),
    me(db)
  );

  return router;
}
