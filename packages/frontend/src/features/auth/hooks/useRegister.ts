import { z } from "zod";
import { useState } from "react";
import { parseFormData } from "../../../lib";
import { RegisterRequestSchema } from "@pkg/shared";
import { register } from "../api";
import type { AuthCtxType } from "../../../Context";

type Result = AuthCtxType["register"];

const formDataSchema = RegisterRequestSchema.extend({
  passwordConfirm: z.string().min(8).max(20)
});

const errorMap = {
  AlreadyRegistered: "登録済のアカウントです",
  GetTokenFailed: "認証トークンの取得に失敗しました",
  UnknownError: "エラーが発生しました"
} as const;


export const useRegister = (useSession: AuthCtxType["session"]): Result => {
  const [status, setStatus] = useState<Result["status"]>("idle");

  const tryRegister = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      setStatus("loading");

      const formData:FormData = new FormData(e.currentTarget);
      const parsed = await parseFormData(formData, formDataSchema);
      if (!parsed.success) {
        setStatus("idle");
        alert("入力値が正しくありません");
        return;
      }

      const data = parsed.data;
      if (data.password !== data.passwordConfirm) {
        setStatus("idle");
        alert("パスワード確認が一致しません");
        return;
      }

      const result = await register({ email: data.email, password: data.password  });
      if (!result.ok) {
        setStatus("idle");
        alert(errorMap[result.errorType]);
        return;
      }

      useSession.setStatus("active");
      setStatus("success");
      alert("登録完了");
    }


  return {
    status,
    register: tryRegister
  }
}
