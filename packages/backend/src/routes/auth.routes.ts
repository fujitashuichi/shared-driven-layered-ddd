import { Router } from "express";
import { Database } from "sqlite3";
import { session, login, logout, register } from "../controller/index.js";
import { requestValidator } from "../middleware/index.js";


export const createAuthRouter = (db: Database) => {
  const router = Router();

  router.post("/register",
    (req, res, next) => requestValidator(req, res, next, "register"),
    (req, res) => register(req, res, db)
  );

  router.get("/session",
    (req, res) => session(req, res, db)
  );

  router.post("/login",
    (req, res, next) => requestValidator(req, res, next, "login"),
    (req, res) => login(req, res, db)
  );

  router.post("/logout",
    logout
  );

  router.post("/me", (req, res) => {
    res.status(501).send();
  });

  return router;
}
