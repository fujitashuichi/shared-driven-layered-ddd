import { LoginRequestSchema } from "@pkg/shared";
import { parseFormData } from "../../../lib";
import { login } from "../api";
import React, { useState } from "react";
import type { AuthCtxType } from "../../../Context";

type Result = AuthCtxType["login"];

export const useLogin = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const [status, setStatus] = useState<Result["status"]>("idle");

  const tryLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, LoginRequestSchema);

    if (!parsed.success) {
      setStatus("idle");
      setSessionStatus("inactive");
      alert("入力値に不備があります");
      return;
    }

    const data = parsed.data;
    const isLoginSucceed = await login({ email: data.email, password: data.password });
    if (!isLoginSucceed) {
      setSessionStatus("inactive");
      setStatus("failed");
      return;
    }

    setSessionStatus("active");
    setStatus("loggedIn");
    return;
  }

  return {
    status: status,
    login: tryLogin
  }
}
