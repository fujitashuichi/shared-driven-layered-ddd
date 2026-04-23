import { LoginRequestSchema, type LoginRequest } from "@pkg/shared";
import { parseFormData } from "../../../lib";
import { login as loginApi } from "../api";
import type { AuthCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Result = AuthCtxType["login"];

const errorMap = {
  UnRegistered: "そのメールアドレスは登録されていません",
  Unknown: "エラーが発生しました"
} as const;


export const useLogin = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const [overrideStatus, setOverrideStatus] = useState<"error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const mutation = useMutation({
    mutationFn: (body: LoginRequest) => loginApi(body),
    onSuccess: (result) => {
      if (!result.ok) {
        setOverrideStatus("error");
        setErrorMessage(errorMap[result.errorType])
        return setSessionStatus("inactive");
      }
      setSessionStatus("active");
      window.location.replace("/");
    },
    onError: () => {
      setSessionStatus("inactive");
      alert("通信に失敗しました。時間をおいて再度お試しください。\n※学習用なのでSupabaseが停止していることがあります");
    }
  });


  const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

  return { status: trulyStatus, errorMessage, login }
}
