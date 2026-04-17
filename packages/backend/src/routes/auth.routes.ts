import { Router } from "express"
import { createUser, session } from "../controller/auth.controller.js";
import { requestValidator } from "../middleware/index.js";
import { ExpressAuth } from "@auth/express";
import { authConfig } from "../config/authConfig.js";


export const createAuthRouter = () => {
  const router = Router();

  router.get("/session", session);

  router.post("/register",
    requestValidator("register"),
    createUser
  );

  // ExpressAuth: エラー型を緩く設定している?
  // 致命的エラー以外は大抵素通しされるため、細かいエラーログを作るべきか?
  router.use("/", ExpressAuth(authConfig));

  return router;
}
