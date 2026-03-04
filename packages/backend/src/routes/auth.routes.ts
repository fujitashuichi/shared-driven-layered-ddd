import { Router } from "express";
import { loginValidation, registerValidation } from "../middleware/index.js";
import { Database } from "sqlite3";
import { isLoggedIn, login, logout, register } from "../controller/index.js";


export const createAuthRouter = (db: Database) => {
  const router = Router();

  router.post("/register",
      registerValidation,
      (req, res) => register(req, res, db)
  );

  router.get("/is-logged-in",
      isLoggedIn
  );

  router.post("/login",
    loginValidation,
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
