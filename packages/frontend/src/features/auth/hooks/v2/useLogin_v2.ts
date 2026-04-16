import { LoginRequestSchema, type LoginRequest } from "@pkg/shared";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { AuthCtxType } from "../../../../Context";
import { login_v2 } from "../../api/v2/login_v2";
import { parseFormData } from "../../../../lib";

type Result = AuthCtxType["login"];

const errorMap = {
  UnRegistered: "そのメールアドレスは登録されていません",
  Unknown: "エラーが発生しました"
} as const;


export const useLogin_v2 = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const [overrideStatus, setOverrideStatus] = useState<"error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const mutation = useMutation({
    mutationFn: (body: LoginRequest) => login_v2(body),
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

  return { status: trulyStatus, errorMessage, login: tryLogin }
}
