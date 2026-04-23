import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../api/register";
import { RegisterRequestSchema, type RegisterRequest } from "@pkg/shared";
import type { AuthCtxType } from "../../../Context";
import { parseFormData } from "../../../lib";
import { useState } from "react";


type Result = AuthCtxType["register"];

const errorMap = {
  AlreadyRegistered: "登録済のアカウントです",
  GetTokenFailed: "認証トークンの取得に失敗しました",
  UnknownError: "エラーが発生しました"
} as const;

const formDataSchema = RegisterRequestSchema.extend({
  passwordConfirm: z.string().min(8).max(20)
});


export const useRegister = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const [overrideStatus, setOverrideStatus] = useState<"error" | null>(null);

  const mutation = useMutation({
    mutationFn: (body: RegisterRequest) => registerApi(body),
    onSuccess: (result) => {
      if (!result.ok) {
        setSessionStatus("inactive");
        setOverrideStatus("error");
        alert(errorMap[result.errorType]);
        return;
      }
      setSessionStatus("active");
      alert("登録完了");
      window.location.replace("/");
    },
    onError: () => alert("通信に失敗しました。時間をおいて再度お試しください。\n※学習用なのでSupabaseが停止していることがあります")
  });


  const register = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData:FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData({
      formData,
      schema: formDataSchema,
      useFor: "noEmptyValues"
    });
    if (!parsed.success) {
      alert("入力値が正しくありません");
      return;
    }

    const data = parsed.data;
    if (data.password !== data.passwordConfirm) {
      alert("パスワード確認が一致しません");
      return;
    }

    mutation.mutate({ email: data.email, password: data.password });
  }


  const trulyStatus = overrideStatus ?? mutation.status;

  return { status: trulyStatus, register }
}
