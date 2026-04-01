import { LoginRequestSchema, type LoginRequest } from "@pkg/shared";
import { parseFormData } from "../../../lib";
import { login } from "../api";
import type { AuthCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Result = AuthCtxType["login"];

export const useLogin = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const [overrideStatus, setOverrideStatus] = useState<"error" | null>(null);

  const mutation = useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: (isLoginSucceed) => {
      if (!isLoginSucceed) {
        setOverrideStatus("error");
        return setSessionStatus("inactive");
      }
      return setSessionStatus("active");
    },
    onError: () => {
      setSessionStatus("inactive");
      alert("通信に失敗しました。時間をおいて再度お試しください。\n※学習用なのでSupabaseが停止していることがあります");
    }
  });


  const tryLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const parsed = await parseFormData({
      formData,
      schema: LoginRequestSchema,
      useFor: "noEmptyValues"
    });

    if (!parsed.success) {
      setSessionStatus("inactive");
      alert("入力値に不備があります");
      return;
    }

    setOverrideStatus(null);
    setSessionStatus("idle");
    mutation.mutate(parsed.data);
  }


  const trulyStatus = overrideStatus ?? (mutation.status === "success" ? "loggedIn" : mutation.status);

  return { status: trulyStatus, login: tryLogin }
}
