import { Router } from "express";
import { registerValidation } from "../middleware/index.js";
import { Database } from "sqlite3";
import { isLoggedIn, register } from "../controller/index.js";


export const createAuthRouter = (db: Database) => {
  const router = Router();

  router.post("/register",
      registerValidation,
      (req, res) => register(req, res, db)
  );

  router.get("/is-logged-in",
      isLoggedIn
  );

  router.post("/login", (req, res) => {
    res.status(501).send();
  });

  router.post("/logout", (req, res) => {
    res.status(501).send();
  });

  router.post("/me", (req, res) => {
    res.status(501).send();
  });

  return router;
}
